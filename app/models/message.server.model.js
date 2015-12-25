var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

        
var MessageSchema = new Schema({
    authorId: String,
    audioUrl: String,
    imageUrl: String,
    created: {
        type: Date,
        default: Date.now
    },
    title:String,
    description: String
});


mongoose.model('Message', MessageSchema);
