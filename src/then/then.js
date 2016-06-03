const execSync = (retValue, err) => {
  if(err){
    throw err;
  }
  return retValue;
};

const execAsync = (retValue, error, force, cb) => {
  if(error && force){
    throw error;
  }
  if(error){
    return cb(error);
  }
  return cb(null, retValue);
};

const execPromise = (retValue, error) => {
  if(error){
    return new Promise((resolve, reject) => reject(error));
  }
  return new Promise(resolve => resolve(retValue));
};

/*
Hi everyone, I'm the Then class! I have two jobs:
1) Store values to return later
2) Return the values when asked
*/
class Then {
  constructor(mockedFunction){
    this.force = false;
    this.isPromise = false;
    this.mockedFunction = mockedFunction;
    this.promise = {
      to: {
        return: value => {
          this.isPromise = true;
          return this.return(value);
        },
        error: error => {
          this.isPromise = true;
          return this.error(error);
        }
      }
    };
  }
  return(value){
    this.checkDuplicate();
    this.returnValue = value;
    return this.mockedFunction;
  }
  error(error){
    this.checkDuplicate();
    this.errorValue = error instanceof Error ? error : new Error(error);
    return this.mockedFunction;
  }
  forceError(error){
    this.error(error);
    this.force = true;
    return this.mockedFunction;
  }
  valid(){
    return this.errorValue ? !this.returnValue : this.returnValue !== undefined;
  }
  checkDuplicate(){
    if(this.valid()){
      //TODO: Make errors great again.
      throw new Error('A when cannot have more than one corresponding then clause.');
    }
  }
  execute(cb){
    if(!this.valid()){
      //TODO: Make the error great again
      throw new Error('A when must have a matching then. You did not specify a valid then clause for this when.');
    }
    if(this.isPromise){
      return execPromise(this.returnValue, this.errorValue);
    }
    if(cb){
      return execAsync(this.returnValue, this.errorValue, this.force, cb);
    }
    return execSync(this.returnValue, this.errorValue);
  }
};

export default Then;
