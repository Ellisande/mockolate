import any from '../../src/matchers/any';
import { expect } from 'chai';
import Matcher from '../../src/matchers/matcher';

describe('any matcher', () => {
  it('should always return true for matches', () => {
    const anyMatcher = any();
    const matchesRandom = anyMatcher.matches(1, 'a', 1.5, {}, []);
    expect(matchesRandom).to.equal(true);
    const matchesNothing = anyMatcher.matches();
    expect(matchesNothing).to.equal(true);
  });

  it('should return an instance of matcher', () => {
    const anyMatcher = any();
    expect(anyMatcher).to.be.instanceof(Matcher);
  });
});
