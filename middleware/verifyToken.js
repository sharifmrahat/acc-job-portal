const jwt = require("jsonwebtoken");

exports.verifyToken = async  (req,res,next) =>{
    try{
        const { authorization } = req.headers
        if(!authorization){
            return res.status(401).json({
                status: "failed",
                error: "You are not logged in"
                });
        }
        const token = authorization.split(" ")[1]

        const decoded = jwt.verify(token,  process.env.TOKEN_SECRET);
        req.user = decoded
        next()
    }catch(error){
        res.status(401).json({
            status: "fail",
            error: "Invalid Token!"
            });
    }
}