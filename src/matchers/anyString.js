import Matcher from './matcher';
class AnyString extends Matcher {
  constructor(stringToMatch){
    super();
    this.value = stringToMatch;
  }
  matches(){
    if (!this.value) {
      return false;
    }
    if (typeof this.value === 'string' || this.value instanceof String)
      return true;
    else
      return false;
  }
};
export {
  AnyString
};
export default (stringToMatch) => new AnyString(stringToMatch);
