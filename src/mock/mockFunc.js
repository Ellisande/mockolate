import _ from 'lodash';
const When = () => {};

const MockFunction = function(){
  const whens = [];
  const mockedFunction = function(){
    mockedFunction.called++;
    const args = arguments;
    const cb = _.find(args, i => i && typeof i === 'function');
    const matchingWhen = _.find(whens, when => when.matches(args));
    if(matchingWhen){
      if(matchingWhen.error && !cb){
        throw matchingWhen.error;
      }
      return cb ? cb(matchingWhen.error, matchingWhen.Return) : matchingWhen.return;
    }
    return cb ? cb() : undefined;
  };
  mockedFunction.when = function(){
    const args = arguments;
    const when = new When(mockedFunction, args);
    whens.push(when);
    return when;
  };
  mockedFunction.called = 0;
  return mockedFunction;
};

export default MockFunction;
