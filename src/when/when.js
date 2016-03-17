import _ from 'lodash';
import { Matcher, exact } from '../matchers';
import Then from '../then/then';

const logDeprecationWarning = (oldMethod, newMethod) => {
  console.log(`Warning: when.${oldMethod}() is deprecated. It will be removed in the next major version. Use when.then.${newMethod}() instead.`);
};

/*
Hello. My name is the When class. I am supposed to do a couple things very well:
1) Match to arguments. This is my primary function
2) Allow access to my then clause
*/
class When {
  constructor(mockedFunction, args){
    this.then = new Then(mockedFunction);
    this.options = _.get(mockedFunction, 'options.when', {});
    this.args = args;
    this.specificity = args ? args.length : 0;
  }
  valid(){
    return this.then.valid();
  }
  thenReturn(value){
    logDeprecationWarning('thenReturn', 'return');
    return this.then.return(value);
  }
  thenError(errorValue){
    logDeprecationWarning('thenError', 'error');
    return this.then.error(errorValue);
  }
  thenThrow(errorValue){
    logDeprecationWarning('thenThrow', 'forceError');
    return this.then.forceError(errorValue);
  }
  matches(){
    const argsToMatch = arguments || [];
    let allMatch = this.args.every((arg, index) => {
      let argToMatch = argsToMatch[index];
      if(arg instanceof Matcher){
        return arg.matches(argToMatch);
      }
      return exact(arg).matches(argToMatch);
    });
    return allMatch;
  }
}

export default When;
