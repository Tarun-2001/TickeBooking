const jwtWebToken = require("jsonwebtoken");
const Unauthenticated = require("../errors/Unaunthenticated");

const protect = async (req, res, next) => {
  try {
    const autherHead = req.header("Authorization");
    if (!autherHead || !autherHead.startsWith("Bearer "))
      throw new Unauthenticated("Provide token");
    const token = autherHead.split(" ")[1];
    const autherize = jwtWebToken.verify(token, process.env.JWT_SECREAT);
    if (!autherize) throw new Unauthenticated("Invlaid token");
    req.user = autherize.userId;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { protect };
