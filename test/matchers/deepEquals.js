import deepEquals from '../../src/matchers/deepEquals';
import {
    expect
} from 'chai';
import Matcher from '../../src/matchers/matcher';

describe('deepEquals matcher', () => {
    it('should return an instance of Matcher', () => {
        const matcher = deepEquals();
        expect(matcher).to.be.instanceof(Matcher);
    });

    it('should return true if both values are empty objects', () => {
        const value = {};
        const matcher = deepEquals(value);
        expect(matcher.matches({})).to.equal(true);
    });

    it('should return true if both values are ===', () => {
        const object1 = {'a': 1};
        const object2 = {'a': 1};
        const matcher = deepEquals(object1);
        expect(matcher.matches(object2)).to.equal(true);
    });

    it('should return false if the value is null or undefined', () => {
        const nullMatcher = deepEquals(null);
        const undefinedMatcher = deepEquals(undefined);
        expect(nullMatcher.matches(null)).to.equal(false);
        expect(undefinedMatcher.matches()).to.equal(false);
    });

    it('should return false if the two values are not equal objects', () => {
        const matcher = deepEquals({'a': 1});
        expect(matcher.matches({'a': 2})).to.equal(false);
    });

    it('should return true if both values are empty arrays', () => {
        const value = [];
        const matcher = deepEquals(value);
        expect(matcher.matches([])).to.equal(true);
    });

    it('should return true if both values are === arrays', () => {
        const array1 = ['a', 'b'];
        const array2 = ['a', 'b'];
        const matcher = deepEquals(array1);
        expect(matcher.matches(array2)).to.equal(true);
    });

    it('should return false if the two values are not equal arrays', () => {
        const matcher = deepEquals(['a', 'b']);
        expect(matcher.matches(['a', 'a'])).to.equal(false);
    });
});
