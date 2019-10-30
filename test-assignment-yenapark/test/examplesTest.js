const mocha = require('mocha')
const assert = require('chai').assert;
const app = require('../examples');

sendMessageResult = app.sendMessage();
addResult = app.add(3,6);
isNullResult = app.isNull();
stringReverseResult = app.stringReverse('king');
stringReverseResult_upper = app.stringReverse('KING');
createUserResult = app.createUser();

describe('App', function(){
  describe('sendMessage()', function(){
    it('should return hello world', function(){
      assert.equal(sendMessageResult, 'hello world');
    });

    it('should return type string', function(){
      assert.typeOf(sendMessageResult, 'string');
    });
  });

  describe('add()', function(){
    it('should be below 10', function(){
      assert.isBelow(addResult, 10);
    });

    it('should return type number', function(){
      assert.typeOf(addResult, 'number');
    });
  });

  describe('isNull()', function(){
    it('should be defined', function(){
      assert.isDefined(isNullResult);
    });

    it('should return type null', function(){
      assert.typeOf(isNullResult, 'null');
    });
  });

  describe('stringReverse()', function(){
    it('should reverse input string', function(){
      assert.equal(stringReverseResult, 'gnik')
    });

    it('should transform input string into lowercase', function(){
      assert.equal(stringReverseResult_upper, 'gnik');
    });
  });

  describe('createUser()', function(){
    it('should save user', function(){
      assert.equal(createUserResult.name, 'Yena');
      assert.equal(createUserResult.hobby, 'Music');
    });

    it('should not take undefined field', function(){
      assert.typeOf(createUserResult.email, 'undefined');
    });
  });
  
});
