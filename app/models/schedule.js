var mongoose = require('mongoose');

module.exports = mongoose.model('Schedule', {
	date : {type : Date, default: ''},
	start : {type : String, default: ''},
	end : {type : String, default: ''},
	activity : {type : String, default: ''}
});