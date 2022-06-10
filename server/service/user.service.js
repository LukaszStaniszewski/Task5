const UserModel = require("../models/user.model")

exports.findUser = async (input) => {
  return UserModel.findOne(input)
}