const  UserModel = require("../models/user.model");
const jwtUtils = require("../utils/jwt.utils")
const userService = require("../service/user.service")

exports.createAndAuthenticateUser = async (req, res) => {
  const isExisting = await userService.findUser(req.body)
  let user = isExisting
  if(!isExisting) {
    user = await UserModel.create(req.body)
  }

  const authenticationToken = jwtUtils.signJwt(user, '1h')
  res.json({authenticationToken, user})

}

exports.sendUser = async (req, res) => {
  const currentUser = res.locals.user
  try {
    const user = await UserModel.findOne(currentUser)
    res.json(user)
  } catch (error) {
    res.sendStatus(400)
    console.log(error)
  }
}

exports.sendUserNames = async (req, res) => {
  const names = await userService.findAllUsersNames()
  if(!names) res.sendStatus(418)
  res.json(names)
}
