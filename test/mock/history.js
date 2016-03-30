import CallHistory, {Call} from '../../src/mock/history';
import {expect} from 'chai';
import {any} from '../../src/matchers/index';

describe('call history', () => {
  var callHistory;
  beforeEach(() => {
    callHistory = new CallHistory();
  });

  describe('add', () => {
    it('should save args in history', () => {
      const oneDepth = callHistory.add('a');
      expect(oneDepth).to.have.length.of(1);
      const lastCall = oneDepth.calls[0];
      expect(lastCall).to.be.ok;
      expect(lastCall).to.be.instanceof(Call);
      expect(lastCall.args).to.deep.equal(['a']);
    });

    it('should save the scope of the call', () => {
      const testScope = {};
      const oneDepth = callHistory.add('a', testScope);
      expect(oneDepth).to.have.length.of(1);
      expect(oneDepth).not.to.equal(callHistory);
      const lastCall = oneDepth.calls[0];
      expect(lastCall).to.be.ok;
      expect(lastCall).to.be.instanceof(Call);
      expect(lastCall.args).to.deep.equal(['a']);
      expect(lastCall.scope).to.equal(testScope);
    });

    it('should save even if args and scope are null', () => {
      const oneDepth = callHistory.add();
      expect(oneDepth).to.have.length.of(1);
      expect(oneDepth).not.to.equal(callHistory);
      const lastCall = oneDepth.calls[0];
      expect(lastCall).to.be.ok;
      expect(lastCall).to.be.instanceof(Call);
      expect(lastCall.args).to.have.length.of(0);
      expect(lastCall.scope).to.equal(undefined);
    });

    it('should accept an array of args', () => {
      const testScope = {};
      const testArgs = ['a', 'b', 'c'];
      const oneDepth = callHistory.add(testArgs, testScope);
      expect(oneDepth).to.have.length.of(1);
      expect(oneDepth).not.to.equal(callHistory);
      const lastCall = oneDepth.calls[0];
      expect(lastCall).to.be.ok;
      expect(lastCall).to.be.instanceof(Call);
      expect(lastCall.args).to.deep.equal(['a', 'b', 'c']);
      expect(lastCall.scope).to.equal(testScope);
    });
  });

  describe('last', () => {
    it('should be able to get the last call', () => {
      const testScope = {};
      const oneDepth = callHistory.add('a', testScope);
      expect(oneDepth).to.have.length.of(1);
      expect(oneDepth).not.to.equal(callHistory);
      const lastCall = oneDepth.last;
      expect(lastCall).to.be.ok;
      expect(lastCall).to.be.instanceof(Call);
      expect(lastCall.args).to.deep.equal(['a']);
      expect(lastCall.scope).to.equal(testScope);
    });

    it('should be return undefined if never called', () => {
      const lastCall = callHistory.last;
      expect(lastCall).to.equal(undefined);
    });
  });

  describe('find matching args', () => {
    it('should find a match when the args are exactly equal', () => {
      const oneDepth = callHistory.add('a');
      const calls = oneDepth.findMatchingArgs('a');
      expect(calls).to.have.length.of(1);
      const matchingCall = calls[0];
      expect(matchingCall.args).to.deep.equal(['a']);
      expect(matchingCall).to.equal(oneDepth.last);
    });

    it('should not find anything when the args do not match at all', () => {
      const oneDepth = callHistory.add('a');
      const calls = oneDepth.findMatchingArgs('b');
      expect(calls).to.have.length.of(0);
    });

    it('should find multiple calls if they match', () => {
      const oneDepth = callHistory.add('a');
      const twoDepth = oneDepth.add('a');
      const calls = twoDepth.findMatchingArgs('a');
      expect(calls).to.have.length.of(2);
      calls.forEach( call => expect(call.args).to.deep.equal(['a']));
    });

    it('should find only the calls that match', () => {
      const oneDepth = callHistory.add('a');
      const twoDepth = oneDepth.add('b');
      const threeDepth = twoDepth.add('a');
      const calls = threeDepth.findMatchingArgs('a');
      expect(calls).to.have.length.of(2);
      calls.forEach( call => expect(call.args).to.deep.equal(['a']));
    });

    it('should find matches when the search terms are a subset of the args', () => {
      const oneDepth = callHistory.add(['a', 'b']);
      const twoDepth = oneDepth.add('b');
      const threeDepth = twoDepth.add('a');
      const calls = threeDepth.findMatchingArgs('a');
      expect(calls).to.have.length.of(2);
    });

    it('should not find matches if the search args and more specific then the actual invocation', () => {
      const oneDepth = callHistory.add(['a', 'b']);
      const twoDepth = oneDepth.add('b');
      const threeDepth = twoDepth.add('a');
      const calls = threeDepth.findMatchingArgs(['a', 'b']);
      expect(calls).to.have.length.of(1);
    });

    it('should allow the use of matchers', () => {
      const oneDepth = callHistory.add(['a', 'b']);
      const twoDepth = oneDepth.add('b');
      const threeDepth = twoDepth.add('a');
      const calls = threeDepth.findMatchingArgs([any(), 'b']);
      expect(calls).to.have.length.of(1);
    });
  });
});
