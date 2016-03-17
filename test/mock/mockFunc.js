import MockFunction from '../../src/mock/mockFunc';
import {
  expect
} from 'chai';
import When from '../../src/when/when';

describe('mock function', () => {
  var mockFunc;
  beforeEach(() => mockFunc = MockFunction());

  describe('no when', () => {
    it('should have return undefined with no callback', () => {
      expect(mockFunc()).not.to.be.ok;
    });

    it('should invoke the callback with nothing', (done) => {
      const cb = function(err, result) {
        expect(err).not.to.be.ok;
        expect(result).not.to.be.ok;
        done();
      };
      mockFunc(cb);
    });
  });

  describe('when', () => {
    it('should have a when method', () => {
      expect(mockFunc.when).to.be.ok;
    });

    it('should accepts arguments', () => {
      expect(mockFunc.when('a', 'b', 1, 3)).to.be.ok;
    });

    it('should return a When object', () => {
      expect(mockFunc.when()).to.be.instanceof(When);
    });
  });

  describe('matching when', () => {
    it('should throw an error in there is no corresponding then', () => {
      mockFunc.when(1);
      expect(mockFunc.bind(null, 1)).to.throw(/A when must have/);
    });

    it('should invoke the execute function for the corresponding then', () => {
      mockFunc.when(1).then.return('a');
      expect(mockFunc(1)).to.equal('a');
    });
  });

  describe('specificity', () => {
    it('should match more specific whens before less specific ones', () => {
      mockFunc.when().thenReturn('bat');
      mockFunc.when(1).thenReturn('crazy');
      expect(mockFunc(1)).to.equal('crazy');
      expect(mockFunc()).to.equal('bat');
    });

    it('should not matter the order the whens are declared', () => {
      mockFunc.when(1).thenReturn('crazy');
      mockFunc.when().thenReturn('bat');
      expect(mockFunc(1)).to.equal('crazy');
      expect(mockFunc()).to.equal('bat');
    });

    it('should not matter the order the mockFunctions are invoked', () => {
      mockFunc.when().thenReturn('bat');
      mockFunc.when(1).thenReturn('crazy');
      expect(mockFunc()).to.equal('bat');
      expect(mockFunc(1)).to.equal('crazy');
    });
  });

  describe('verification', () => {
    it('should be able to report the number of times it was invoked', () => {
      mockFunc();
      mockFunc();
      mockFunc();
      expect(mockFunc.called).to.equal(3);
    });
  });
});
