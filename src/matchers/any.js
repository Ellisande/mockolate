import Matcher from './matcher';
class AnyMatcher extends Matcher {
  constructor(){
    super();
  }
  matches(){
    return true;
  }
};

export {
  AnyMatcher
};
export default () => new AnyMatcher();
