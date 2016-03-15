import Matcher from './matcher';
class ExactMatcher extends Matcher {
  constructor(value){
    super();
    this.value = value;
  }
  matches(otherValue) {
    if (!this.value) {
      return false;
    }
    if (this.value === otherValue) {
      return true;
    }
    if (this.value.equals) {
      return this.value.equals(otherValue);
    }
    return false;
  }
}

export {
  ExactMatcher
};
export default (valueToMatch) => new ExactMatcher(valueToMatch);
