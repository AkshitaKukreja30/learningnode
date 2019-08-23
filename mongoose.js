var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/empdb');

module.exports = {
	mongoose
};


