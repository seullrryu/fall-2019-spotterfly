module.exports = {
  sendMessage: function(){
    return 'hello world';
  },

  add: function(num1, num2){
    return num1 + num2;
  },

  isNull: function(){
  	return null;
  },

  stringReverse(str) {
    string_reversed = str.toLowerCase().split('').reverse().join('');
    return string_reversed
   },

  createUser: function(){
  	const user = { name: 'Yena' };
  	user['hobby'] = 'Music';
  	return user;
   }
}