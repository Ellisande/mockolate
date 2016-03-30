import mockFunction from './mock/mockFunc';
import {any, anyString, exact} from './matchers';
const matchers = {
  any,
  anyString,
  exact
};

export {mockFunction, matchers};
export default mockFunction;
