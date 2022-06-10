const UserModel = require("../models/user.model")

exports.findUser = async (input) => {
  return UserModel.findOne(input)
}

exports.findAllUsersNames = async () => {
  try{
    const users = await UserModel.find();
    return users.map(user => user.username)
  } catch(error){
    console.error(error)
  }

}