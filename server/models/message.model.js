const { Schema, model, SchemaTypes } = require("mongoose")

const messageSchema  = new Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  postedBy : {type: SchemaTypes.String, ref: 'user', required:true},
  recipient: {type: SchemaTypes.String, ref: 'user', required:true},
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true
  },
})

const MessageModel =  model('Message', messageSchema);
module.exports = MessageModel