import * as Matchers from '../../src/matchers/index';
import { expect } from 'chai';

describe('matchers', () => {
  it('should expose the Matcher object', () => {
    expect(Matchers.Matcher).to.be.ok;
  });

  it('should expose an any matcher', () => {
    expect(Matchers.any).to.be.ok;
  });

  it('should expose an anyString matcher', () => {
    expect(Matchers.anyString).to.be.ok;
  });

  it('should expose an exact matcher', () => {
    expect(Matchers.exact).to.be.ok;
  });
});
