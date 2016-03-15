import thenPromise from '../../src/then/promise.js';
import {expect} from 'chai';

describe('thenPromise', () => {
  it('should return a object with toReturn and toError', () => {
    expect(thenPromise).to.be.ok;
    expect(thenPromise.toReturn).to.be.ok;
    expect(thenPromise.toError).to.be.ok;
  });

  describe('toReturn', () => {
    it('should invoke the then callback with the provided value', (done) => {
      thenPromise.toReturn(1).then(result => {
        expect(result).to.equal(1);
        done();
      });
    });
  });

  describe('toError', () => {
    it('should invoke the catch clause with the provided error', (done) => {
      const error = new Error('Error');
      thenPromise.toError(error).catch(err => {
        expect(err).to.be.ok;
        expect(err).to.equal(error);
        done();
      });
    });
  });
});
