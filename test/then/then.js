import Then from '../../src/then/then';
import {
  expect
} from 'chai';

describe('Then object', () => {
  const mockFunc = () => {};
  var newThen;
  beforeEach(() => newThen = new Then(mockFunc));

  it('should construct with no error, returnValue, or force flag', () => {
    expect(newThen).to.be.ok;
    expect(newThen.returnValue).not.to.be.ok;
    expect(newThen.errorValue).not.to.be.ok;
    expect(newThen.force).to.equal(false);
    expect(newThen.mockedFunction).to.equal(mockFunc);
    expect(newThen.isPromise).to.equal(false);
  });

  describe('return', () => {
    it('should set the return value', () => {
      expect(newThen.return).to.be.ok;
      newThen.return('a');
      expect(newThen.returnValue).to.equal('a');
    });

    it('should return the mocked function for chaining', () => {
      expect(newThen.return('a')).to.equal(mockFunc);
    });

    it('should make it a valid Then', () => {
      expect(newThen.valid()).to.equal(false);
      newThen.return('a');
      expect(newThen.valid()).to.equal(true);
    });
  });

  describe('error', () => {
    it('should set the error value', () => {
      expect(newThen.error).to.be.ok;
      newThen.error('a');
      expect(newThen.errorValue.message).to.equal('a');
    });

    it('should return the mocked function for chaining', () => {
      expect(newThen.error('a')).to.equal(mockFunc);
    });

    it('should make it a valid Then', () => {
      expect(newThen.valid()).to.equal(false);
      newThen.error('a');
      expect(newThen.valid()).to.equal(true);
    });

    it('should convert messages into errors', () => {
      newThen.error('a');
      expect(newThen.errorValue).to.be.instanceof(Error);
      expect(newThen.errorValue.message).to.equal('a');
    });

    it('should not convert error objects', () => {
      const testError = new Error('a');
      newThen.error(testError);
      expect(newThen.errorValue).to.equal(testError);
    });

    it('should not set force to true', () => {
      const testError = new Error('a');
      newThen.error(testError);
      expect(newThen.force).to.equal(false);
    });
  });

  describe('force error', () => {
    it('should set the error value', () => {
      expect(newThen.forceError).to.be.ok;
      newThen.forceError('a');
      expect(newThen.errorValue.message).to.equal('a');
    });

    it('should return the mocked function for chaining', () => {
      expect(newThen.forceError('a')).to.equal(mockFunc);
    });

    it('should make it a valid Then', () => {
      expect(newThen.valid()).to.equal(false);
      newThen.forceError('a');
      expect(newThen.valid()).to.equal(true);
    });

    it('should convert messages into errors', () => {
      newThen.forceError('a');
      expect(newThen.errorValue).to.be.instanceof(Error);
      expect(newThen.errorValue.message).to.equal('a');
    });

    it('should not convert error objects', () => {
      const testError = new Error('a');
      newThen.forceError(testError);
      expect(newThen.errorValue).to.equal(testError);
    });

    it('should set force to true', () => {
      const testError = new Error('a');
      newThen.forceError(testError);
      expect(newThen.force).to.equal(true);
    });
  });

  describe('valid', () => {
    it('should be invalid if no return or error is set', () => {
      expect(newThen.returnValue).to.not.be.ok;
      expect(newThen.errorValue).to.not.be.ok;
      expect(newThen.valid()).to.equal(false);
    });

    it('should be valid if the return value is set', () => {
      newThen.return('a');
      expect(newThen.returnValue).to.be.ok;
      expect(newThen.errorValue).to.not.be.ok;
      expect(newThen.valid()).to.equal(true);
    });

    it('should be valid if the error value is set', () => {
      newThen.error('a');
      expect(newThen.returnValue).to.not.be.ok;
      expect(newThen.errorValue).to.be.ok;
      expect(newThen.valid()).to.equal(true);
    });

    it('should be invalid if a return value and error valuea are both set', () => {
      newThen.returnValue = 'a';
      newThen.errorValue = 'b';
      expect(newThen.returnValue).to.be.ok;
      expect(newThen.errorValue).to.be.ok;
      expect(newThen.valid()).to.equal(false);
    });
  });

  describe('duplicate function calls', () => {
    it('should error if a second then clause is invoked', () => {
      newThen.return('a');
      try {
        newThen.return('a');
      } catch (err) {
        expect(err).to.be.ok;
        return;
      }
      expect(true).not.to.be.ok;
    });

    it('should if a second error clause is invoked', () => {
      const doubleError = new Then(mockFunc);
      doubleError.error('a');
      try {
        doubleError.error('a');
      } catch (err) {
        expect(err).to.be.ok;
        return;
      }
      expect(true).not.to.be.ok;
    });
  });

  describe('promise', () => {
    it('should expose a to object', () => {
      expect(newThen.promise).to.be.ok;
      expect(newThen.promise.to).to.be.ok;
    });

    describe('to.return', () => {
      it('should set promise to true', () => {
        newThen.promise.to.return(1);
        expect(newThen.isPromise).to.equal(true);
      });

      it('should set the return value', () => {
        newThen.promise.to.return(1);
        expect(newThen.returnValue).to.equal(1);
      });
    });

    describe('to.error', () => {
      const testError = new Error('a');
      it('should set promise to true', () => {
        newThen.promise.to.error(testError);
        expect(newThen.isPromise).to.equal(true);
      });

      it('should set the error value', () => {
        newThen.promise.to.error(testError);
        expect(newThen.errorValue).to.equal(testError);
      });
    });
  });

  describe('execute', () => {
    it('should throw an error if this then is not valid', () => {
      expect(newThen.execute.bind(newThen)).to.throw(/A when must/);
    });

    describe('synchronous', () => {
      it('should return the set return value', () => {
        newThen.return('a');
        expect(newThen.execute()).to.equal('a');
      });

      it('should throw the provided error if it is set', () => {
        const testError = new Error('a');
        newThen.error(testError);
        expect(newThen.execute.bind(newThen)).to.throw(testError);
      });
    });

    describe('asynchronous', () => {
      it('should invoke the callback with the provided return value', done => {
        newThen.return('a');
        newThen.execute((err, result) => {
          expect(result).to.equal('a');
          done(err);
        });
      });

      it('should invoke the callback with the provided error value', done => {
        const testError = new Error('a');
        newThen.error(testError);
        newThen.execute(err => {
          expect(err).equal(testError);
          done();
        });
      });

      it('should throw an error if force is set', () => {
        const testError = new Error('a');
        newThen.forceError(testError);
        try {
          newThen.execute(() => {
            expect(true).not.to.be.ok;
          });
        } catch (err) {
          expect(err).to.equal(testError);
          return;
        }
        expect(true).not.to.be.ok;
      });
    });

    describe('promise', () => {
      it('should invoke then with the return value', done => {
        newThen.promise.to.return(1);
        newThen.execute().then(result => {
          expect(result).to.equal(1);
          done();
        });
      });

      it('should invoke catch with the error value', done => {
        const testError = new Error('a');
        newThen.promise.to.error(testError);
        newThen.execute().catch(err => {
          expect(err).to.equal(testError);
          done();
        });
      });
    });
  });
});
