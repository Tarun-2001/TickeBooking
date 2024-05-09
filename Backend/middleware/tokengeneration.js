const jwttoken = require('jsonwebtoken')


const generateToke = (id)=>{
    return jwttoken.sign({userId:id},process.env.JWT_SECREAT,{
            expiresIn: '30d',
          });
}

module.exports = generateToke;