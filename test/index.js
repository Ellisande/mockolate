import mockFunc, {mockFunction, matchers} from '../src';
import {expect} from 'chai';

describe('mockolate', () => {
  it('should export mockFunction', () => {
    expect(mockFunction).to.be.ok;
  });

  it('should export mock function as the default', () => {
    expect(mockFunc).to.be.ok;
    expect(mockFunc).to.equal(mockFunction);
  });

  describe('matchers', () => {
    it('should expose the any matcher', () => {
      expect(matchers).be.ok;
      expect(matchers.any).to.be.ok;
    });

    it('should expose the anyString matcher', () => {
      expect(matchers).be.ok;
      expect(matchers.anyString).to.be.ok;
    });

    it('should expose the exact matcher', () => {
      expect(matchers).to.be.ok;
      expect(matchers.exact).to.be.ok;
    });
  });
});
