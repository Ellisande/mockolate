import _ from 'lodash';
import When from '../when/when';
import CallHistory from './history';

const sortBySpecificity = (leftWhen, rightWhen) => {
  return rightWhen.specificity - leftWhen.specificity;
};

const MockFunction = function(){
  const whens = [];
  var history = new CallHistory();
  const mockedFunction = function(){
    const args = _.toArray(arguments);
    history = history.add(args, this);
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
  mockedFunction.called = () => {
    return history.calls;
  };
  mockedFunction.called.with = (...args) => {
    return history.findMatchingArgs(args);
  };
  return mockedFunction;
};

export default MockFunction;
