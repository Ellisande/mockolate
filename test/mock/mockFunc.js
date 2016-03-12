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

    describe('return value', () => {
      it('should return a result when invoked with a matching when/then', () => {
        mockFunc.when(1).thenReturn(2);
        expect(mockFunc(1)).to.equal(2);
      });

      it('should invoke a callback with a result if a match when/thenReturn is found', done => {
        mockFunc.when(1).thenReturn(2);
        mockFunc(1, (err, result) => {
          expect(result).to.equal(2);
          done(err);
        });
      });
    });

    describe('error value', () => {
      it('should throw an error if an error value is specified with no callback', () => {
        mockFunc.when(1).thenError('crazy');
        expect(mockFunc.bind(null, 1)).to.throw(/crazy/);
      });

      it('should return an error value to the callback if an error value and callback are given', done => {
        mockFunc.when(1).thenError('crazy');
        mockFunc(1, err => {
          expect(err).to.equal('crazy');
          done();
        });
      });
    });

    describe('forced error', () => {
      it('should throw an error if a callback is not given', () => {
        mockFunc.when(1).thenThrow('crazy');
        expect(mockFunc.bind(null, 1)).to.throw(/crazy/);
      });

      it('should throw an error even if a callback is provided', () => {
        mockFunc.when(1).thenThrow('crazy');
        const cb = () => {};
        expect(mockFunc.bind(null, 1, cb)).to.throw(/crazy/);
      });
    });
  });

  describe('specificity', () => {
    it('should match more specific whens before less specific ones', () => {
      mockFunc.when().thenReturn('bat');
      mockFunc.when(1).thenReturn('crazy');
      expect(mockFunc(1)).to.equal('crazy');
      expect(mockFunc()).to.equal('bat');
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
