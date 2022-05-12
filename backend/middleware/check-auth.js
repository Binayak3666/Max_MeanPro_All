const jwt = require("jsonwebtoken")
// middleware auth token verify for backend
module.exports = (req, res, next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "Secrate_Unknown@123")
    next();
  }catch{
    res.status(401).json({
      message: "Auth failed!"
    })
  }
}
