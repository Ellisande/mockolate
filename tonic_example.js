const mockFunction = require('mockolate').mockFunction;
const ninja = {
  getArsenal: mockFunction()
};

ninja.getArsenal.when('ninja stars').then.return('100 crazy awesome ninja stars');

console.log(ninja.getArsenal('ninja stars'));
//Result '100 crazy awesome ninja stars'

console.log(ninja.getArsenal());
//Result undefined, since we didn't specify a when for no arguments
