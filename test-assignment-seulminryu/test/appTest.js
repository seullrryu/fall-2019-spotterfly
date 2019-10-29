const assert = require('chai').assert;
const app = require('../app');

describe('App',function() {
  it('app should return hello', function() {
    let result = app.sayHello();
    assert.equal(result, 'hello');
  });

  it('sayHello should return string', function() {
    let result = app.sayHello();
    assert.typeOf(result,'string');
  });

  it("addNumbers should be above 5", function() {
    let result = app.addNumbers(5,5);
    assert.isAbove(result, 5);
  });

  it("addNumbers should return type number", function() {
    let result = app.addNumbers(5,5);
    assert.typeOf(result,'number');
  });

  it("returnFive should return true", function() {
    let result = app.returnFive(5);
    assert.isTrue(result);
  });

  it("lengthOfArray should return three", function() {
    let result = app.lengthOfArray([1,2,3]);
    assert.equal(result, 3);
  });

  it("power should be under 20",function() {
    let result = app.power(4);
    assert.isBelow(result, 20);
  });

  it("power should be at least 25", function() {
    let result = app.power(5);
    assert.isAtLeast(result,25);
  });

  it("array created should include 5", function() {
    let result = app.create();
    assert.include(result, 5);
  });

  it("create should return an array", function() {
    let result = app.create();
    assert.isArray(result);
  });
})
