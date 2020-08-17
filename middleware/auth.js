
const jwt=require("jsonwebtoken");
const config=require("config");

const secret=config.get("jwtSecret");


module.exports=function (req,res,next) {

    const token=req.header("auth-token");


    if(!token){
        return res.status(401).json({msg:"Login Required"})
    }

    try{
        const decoded=jwt.verify(token,secret);
        // console.log(decoded);
        req.user=decoded;
        
        next();

    }catch(err){
        res.status(401).json({msg:"Token is Invalid"})
    }

    
}