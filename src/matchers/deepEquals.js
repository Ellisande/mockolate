import Matcher from './matcher';
import _ from 'lodash';

class DeepEqualsMatcher extends Matcher {
    constructor(value){
        super();
        this.value = value;
    }
    matches(otherValue) {
        if (_.isNull(this.value) || _.isUndefined(this.value)) {
            return false;
        }
        return _.isEqual(this.value, otherValue);
    }
}

export {
    DeepEqualsMatcher
};
export default (valueToMatch) => new DeepEqualsMatcher(valueToMatch);

