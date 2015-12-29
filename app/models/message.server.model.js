var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        deepPopulate = require('mongoose-deep-populate')(mongoose);

        
var MessageSchema = new Schema({
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    audioUrl: String,
    imageUrl: String,
    imageUrlTh: String,
    created: {
        type: Date,
        default: Date.now
    },
    title:String,
    description: String
});

MessageSchema.plugin(deepPopulate);

mongoose.model('Message', MessageSchema);
