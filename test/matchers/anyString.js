import anyString from '../../src/matchers/anyString';
import { expect } from 'chai';
import Matcher from '../../src/matchers/matcher';

describe('anyString matcher', () => {
  it('should return an instance of Matcher', () => {
    const matcher = anyString('mystring');
    expect(matcher).to.be.instanceof(Matcher);
  });

  it('should return true if value is a type of string', () => {
    const stringMatcher = anyString('mystring');
    expect(stringMatcher.matches()).to.equal(true);
  });

  it('should return true if value is a type of object with class of string', () => {
    const stringMatcher = anyString(new String('mystring'));
    expect(stringMatcher.matches()).to.equal(true);
  });

  it('should return false if the value is null or undefined', () => {
    const nullMatcher = anyString(null);
    const undefinedMatcher = anyString(undefined);
    expect(nullMatcher.matches()).to.equal(false);
    expect(undefinedMatcher.matches()).to.equal(false);
  });

  it('should return false if the value is not a string', () => {
    const numberMatcher = anyString(1);
    const booleanMatcher = anyString(true);
    const objectMatcher = anyString([1,2,3,4]);
    expect(numberMatcher.matches()).to.equal(false);
    expect(booleanMatcher.matches()).to.equal(false);
    expect(objectMatcher.matches()).to.equal(false);
  });
});
