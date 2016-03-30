import Matcher from './matcher';
class AnyString extends Matcher {
  constructor() {
    super();
  }
  matches(stringToMatch) {
    if (!stringToMatch) {
      return false;
    }
    if (typeof stringToMatch === 'string' || stringToMatch instanceof String) {
      return true;
    }
    return false;
  }
};
export {
  AnyString
};
export default () => new AnyString();
