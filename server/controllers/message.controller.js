const messageModel = require("../models/message.model")

exports.createMessage = async (req, res) => {
  try {
   
    const message = await messageModel.create(req.body)
    console.log("message", message)
    if(message.recipient === message.postedBy) {
      return res.json(message)
    } 
      res.status(200)
      
  } catch (error) {
    res.sendStatus(400)
    console.log(error)
  }
}

exports.sendMessages = async (req ,res, next) => {
 if(!res.locals.user) return next()
 const currentUser = res.locals.user
 const messages = await messageModel.find({recipient: currentUser.username})
 res.status(200).json(messages)
}