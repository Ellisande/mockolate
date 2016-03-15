import exact from '../../src/matchers/exact';
import Matcher from '../../src/matchers/matcher';
import {expect} from 'chai';

describe('exact matcher', () => {
  it('should return an instance of Matcher', () => {
    const matcher = exact(1);
    expect(matcher).to.be.instanceof(Matcher);
  });

  it('should return true if both values are exactly the same', () => {
    const value = 2;
    const matcher = exact(value);
    expect(matcher.matches(value)).to.equal(true);
  });

  it('should return true if both values are ===', () => {
    const string1 = 'a';
    const string2 = 'a';
    const matcher = exact(string1);
    expect(matcher.matches(string2)).to.equal(true);
  });

  it('should return true if the value has an equals method that returns true', () => {
    const object = {
      equals: () => true
    };
    const matcher = exact(object);
    expect(matcher.matches(1234)).to.equal(true);
  });

  it('should return false if the value is null or undefined', () => {
    const nullMatcher = exact(null);
    const undefinedMatcher = exact(undefined);
    expect(nullMatcher.matches(null)).to.equal(false);
    expect(undefinedMatcher.matches()).to.equal(false);
  });

  it('should return false if the two values are not equal', () => {
    const matcher = exact(1);
    expect(matcher.matches(2)).to.equal(false);
  });
});
