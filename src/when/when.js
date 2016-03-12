import _ from 'lodash';
class When {
  constructor(mockedFunction, args){
    if(!mockedFunction){
      //TODO Add a super awesome error
      throw new Error('Ooops, something went wrong with the mock');
    }
    this.mockedFunction = mockedFunction;
    this.options = _.get(mockedFunction, 'options.when', {});
    this.args = args;
  }
  verify(){
    if(this.then || this.error){
      //TODO Add better error.
      throw new Error('Each when can only have one then. If you want to add another condition, chain it off the then.');
    }
  }
  valid(){
    return this.error ? !this.then : !!this.then;
  }
  thenReturn(returnValue){
    this.verify();
    this.then = returnValue;
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
    const argsToMatch = arguments;
    let allMatch = this.args.every((arg, index) => {
      let argToMatch = argsToMatch[index];
      //If args is a matcher then invoke its matchiness.
      if(arg.equals){
        return arg.equals(argToMatch);
      }
      if(argToMatch.equals){
        return argToMatch.equals(arg);
      }
      return arg === argToMatch;
    });
    return allMatch;
  }
}

export default When;
