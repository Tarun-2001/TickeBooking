const { StatusCodes } = require("http-status-codes");
const user = require("../model/userModel");
const Unauthenticated = require("../errors/Unaunthenticated");
const asyncWrapper = require("../middleware/asyncWrapper");
const MetaError = require('../errors/MetaError')

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new MetaError.BadRequest("Please provide password and email");
  const users = await user.findOne({ email });
  if (!users) throw new Unauthenticated("User not exist");
  const isPasswordCorrect = await users.comparePassword(password);
  if (!isPasswordCorrect) throw new Unauthenticated("Invalid Credentials");
  const token = users.createJWT();
  res.status(StatusCodes.OK).json({ users, token });
});

const register = asyncWrapper(async (req, res, next) => {
  const {email} = req.body
  let checkUser = user.findOne({email})
  if(!checkUser) throw new MetaError.BadRequest('User already exist')
  const register = await user.create({ ...req.body });
  const token = register.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token });
});

module.exports = { login, register };
