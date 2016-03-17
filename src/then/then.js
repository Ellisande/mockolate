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

class Then {
  constructor(mockedFunction){
    this.force = false;
    this.mockedFunction = mockedFunction;
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
    return this.errorValue ? !this.returnValue : !!this.returnValue;
  }
  checkDuplicate(){
    if(this.valid()){
      //TODO: Make errors great again.
      throw new Error(`A when cannot have more than one corresponding then clause.`);
    }
  }
  execute(cb){
    if(!this.valid()){
      //TODO: Make the error great again
      throw new Error(`A when must have a matching then. You did not specify a valid then clause for this when.`);
    }
    if(this.promise){
      return execPromise(this.returnValue, this.errorValue);
    }
    if(cb){
      return execAsync(this.returnValue, this.errorValue, this.force, cb);
    }
    return execSync(this.returnValue, this.errorValue);
  }
};

export default Then;
