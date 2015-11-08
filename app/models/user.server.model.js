var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    username: String,
    password: String
});


mongoose.model('User', UserSchema);
