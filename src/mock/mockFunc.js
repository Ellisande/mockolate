import _ from 'lodash';
import When from '../when/when';

const sortBySpecificity = (leftWhen, rightWhen) => {
  return rightWhen.specificity - leftWhen.specificity;
};

const MockFunction = function(){
  const whens = [];
  const mockedFunction = function(){
    mockedFunction.called++;
    const args = arguments;
    const cb = _.findLast(args, i => i && typeof i === 'function');
    const matchingWhen = _.find(whens, when => when.matches(...args));
    if(matchingWhen){
      return matchingWhen.then.execute(cb);
    }
    return cb ? cb() : undefined;
  };
  mockedFunction.when = function(){
    const args = _.toArray(arguments);
    const when = new When(mockedFunction, args);
    whens.push(when);
    whens.sort(sortBySpecificity);
    return when;
  };
  mockedFunction.called = 0;
  return mockedFunction;
};

export default MockFunction;
