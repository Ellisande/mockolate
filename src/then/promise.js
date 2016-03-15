const thenPromise = () => {
  return {
    toReturn: returnValue => {
      return new Promise(resolve => resolve(returnValue));
    },
    toError: errorValue => {
      return new Promise((resolve, reject) => reject(errorValue));
    }
  };
};

export default thenPromise();
