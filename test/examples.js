import {mockFunction, matchers} from '../src';
import {expect} from 'chai';

describe('examples', () => {
  describe('synchronous', () => {
    it('synchronous return', () => {
      let ninja = {
        getName: mockFunction()
      };

      ninja.getName.when().then.return('Ryu');
      expect(ninja.getName()).to.equal('Ryu');
    });

    it('synchronous error', done => {
      let ninja = {
        getWeapons: mockFunction()
      };
      ninja.getWeapons.when('swords').then.error('No swords present');
      //We didn't specify a no argument when, so this should not error.
      expect(ninja.getWeapons('stars')).not.to.be.ok;
      try {
        //This should throw an error
        ninja.getWeapons('swords');
      } catch (err){
        expect(err).to.be.ok;
        expect(err.message).to.equal('No swords present');
        done();
      }
    });
  });

  describe('callbacks', () => {
    it('callback return ', done => {
      let ninja = {
        flipOut: mockFunction()
      };
      ninja.flipOut.when(5).then.return('5 flip outs');
      ninja.flipOut(5, (err, result) => {
        expect(result).to.equal('5 flip outs');
        done(err);
      });
    });

    it('callback soft error', done => {
      let ninja = {
        sneak: mockFunction()
      };
      ninja.sneak.when().then.error('Not very sneaky');
      ninja.sneak(err => {
        expect(err.message).to.equal('Not very sneaky');
        done();
      });
    });

    it('callback hard error', done => {
      let ninja = {
        sing: mockFunction()
      };
      ninja.sing.when().then.forceError('Really bad at singing');
      try{
        ninja.sing(err => done(err));
      } catch (err) {
        expect(err.message).to.equal('Really bad at singing');
        done();
      }
    });
  });

  describe('promises', () => {
    it('promise resolve', done => {
      let ninja = {
        fight: mockFunction()
      };
      ninja.fight.when('pirate').then.promise.to.return('win');
      ninja.fight('pirate').then(result => {
        expect(result).to.equal('win');
        done();
      });
    });

    it('promise reject', done => {
      let ninja = {
        grapple: mockFunction()
      };
      ninja.grapple.when('pirate').then.promise.to.error('lose');
      ninja.grapple('pirate').catch(err => {
        expect(err.message).to.equal('lose');
        done();
      });
    });
  });

  describe('matchers', () => {
    it('any matcher', () => {
      let ninja = {
        roundhouse: mockFunction()
      };
      ninja.roundhouse.when(matchers.any(), matchers.any(), 3).then.return('Amazing');
      expect(ninja.roundhouse(null, null, 3)).to.equal('Amazing');
      expect(ninja.roundhouse(1, 'Bob', 3)).to.equal('Amazing');
      expect(ninja.roundhouse(undefined, NaN, 3)).to.equal('Amazing');
    });
  });

  describe('verification', () => {
    it('number of calls', () => {
      let ninja = {
        roundhouse: mockFunction()
      };
      ninja.roundhouse();
      expect(ninja.roundhouse.called()).to.have.length.of(1);
    });

    it('full call history', () => {
      let ninja = {
        roundhouse: mockFunction()
      };
      ninja.roundhouse('a');
      ninja.roundhouse('b');
      const callHistory = ninja.roundhouse.called();
      expect(callHistory).to.have.length.of(2);
      expect(callHistory[0].args).to.deep.equal(['a']);
      expect(callHistory[0].scope).to.equal(ninja);
      expect(callHistory[1].args).to.deep.equal(['b']);
      expect(callHistory[1].scope).to.equal(ninja);
    });

    it('search call history', () => {
      let ninja = {
        roundhouse: mockFunction()
      };
      ninja.roundhouse('a');
      ninja.roundhouse('b');
      expect(ninja.roundhouse.called.with('a')).to.be.ok;
    });
  });
});
