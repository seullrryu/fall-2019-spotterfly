module.exports = {
    sayHello: function() {
        return 'hello';
    },
    addNumbers: function(value1, value2) {
        return value1 + value2;
    },
    returnFive: function(value1) {
      if (value1 == 5) {
        return true;
      }
      else {
        return false;
      }
    },
    lengthOfArray: function(array) {
      return array.length;
    },
    power: function(value1) {
      return value1 * value1;
    },
    create: function() {
      var array = [];
      for (var i = 0; i < 10; i++) {
        array.push(i);
      }
      return array;
    }
}
