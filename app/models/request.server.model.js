var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate')(mongoose);



var RequestSchema = new Schema({
    message: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    responses: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    inQueue: {
        type: Boolean,
        default: true
    },
    language: String
});

RequestSchema.plugin(deepPopulate);

mongoose.model('Request', RequestSchema);
