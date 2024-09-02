const jwt = require("jsonwebtoken");
const jwtauthMiddleware = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({error:"Invalid Token"})
  }
};

const generate_token = (userdata) =>{
    return jwt.sign(userdata  , process.env.SECRET)
}

module.exports = {jwtauthMiddleware , generate_token}