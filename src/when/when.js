import _ from 'lodash';
import { Matcher, exact } from '../matchers';

class When {
  constructor(mockedFunction, args){
    if(!mockedFunction){
      //TODO Add a super awesome error
      throw new Error('Ooops, something went wrong with the mock');
    }
    this.mockedFunction = mockedFunction;
    this.options = _.get(mockedFunction, 'options.when', {});
    this.args = args;
    this.specificity = args ? args.length : 0;
  }
  verify(){
    if(this.return || this.error){
      //TODO Add better error.
      throw new Error('Each when can only have one then. If you want to add another condition, chain it off the then.');
    }
  }
  valid(){
    return this.error ? !this.return : !!this.return;
  }
  thenReturn(returnValue){
    this.verify();
    this.return = returnValue;
    return this.mockedFunction;
  }
  thenError(errorValue){
    this.verify();
    this.error = errorValue;
    return this.mockedFunction;
  }
  thenThrow(errorValue){
    this.verify();
    this.error = errorValue;
    this.forceError = true;
    return this.mockedFunction;
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
