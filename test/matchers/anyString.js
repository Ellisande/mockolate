import anyString from '../../src/matchers/anyString';
import { expect } from 'chai';
import Matcher from '../../src/matchers/matcher';

describe('anyString matcher', () => {
  it('should return an instance of Matcher', () => {
    const matcher = anyString();
    expect(matcher).to.be.instanceof(Matcher);
  });

  it('should return true if value is a type of string', () => {
    const stringMatcher = anyString();
    expect(stringMatcher.matches('mystring')).to.equal(true);
  });

  it('should return true if value is a type of object with class of string', () => {
    const stringMatcher = anyString();
    expect(stringMatcher.matches(new String('mystring'))).to.equal(true);
  });

  it('should return false if the value is null or undefined', () => {
    const stringMatcher = anyString();
    expect(stringMatcher.matches(null)).to.equal(false);
    expect(stringMatcher.matches(undefined)).to.equal(false);
  });

  it('should return false if the value is not a string', () => {
    const stringMatcher = anyString();
    expect(stringMatcher.matches(1)).to.equal(false);
    expect(stringMatcher.matches(false)).to.equal(false);
    expect(stringMatcher.matches([1,2,3,4])).to.equal(false);
  });
});
