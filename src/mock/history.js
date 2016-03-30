import {
  Matcher,
  exact
} from '../matchers/index';

const matchAll = (args, matchers) => matchers.every( (matcher, index) => matcher.matches(args[index]));

class Call {
  constructor(args = [], scope) {
    const newArgs = Array.isArray(args) ? args : [args];
    this.args = newArgs;
    this.scope = scope;
    Object.freeze(this.args);
    Object.freeze(this);
  }
};

class CallHistory {
  constructor(calls) {
    this.calls = calls || [];
    Object.freeze(this.calls);
    this.last = this.calls[this.calls.length - 1];
    Object.freeze(this);
  }
  get length() {
    return this.calls.length;
  }
  add(call, scope) {
    const newCall = call instanceof Call ? call : new Call(call, scope);
    return new CallHistory([...this.calls, newCall]);
  }
  findMatchingArgs(args = []) {
    if(!Array.isArray(args)){
      args = [args];
    }
    const matchers = args.map(arg => arg instanceof Matcher ? arg : exact(arg));
    const matches = this.calls.filter(call => matchAll(call.args, matchers));
    return matches;
  }
};

export {
  Call,
  CallHistory
};
export default CallHistory;
