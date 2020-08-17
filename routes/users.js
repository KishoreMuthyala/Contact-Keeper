const express=require("express");

const router=express.Router();
const User=require("../models/user");

const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const config=require("config");
const secret=config.get("jwtSecret");

const {check,validationResult}=require("express-validator")
const auth=require("../middleware/auth");

router.post("/register",
[
    check("name","Name is Required").not().isEmpty(),
    check("email","Please include a valid email").isEmail(),
    check("password","Please enter a password with 6 or more characters").isLength({min:6})
]

,async(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name,email,password}=req.body;
    const newUser={
        name,
        email,
        password
    }
    // User.findOne({email})
    // .then(savedUser=>res.status(422).json({message:"User already exists"}))

    try{
        let user=await User.findOne({email});

        if(user){
            return res.status(422).json({msg:"User already exists"})
        }

        user=new User(newUser);

        const salt=await bcrypt.genSalt(10);

        user.password=await bcrypt.hash(password,salt)


        await user.save();

        // res.json({user})

        jwt.sign({_id:user._id},secret,{expiresIn:360000},(err,token)=>{
            if(err) throw err;
            res.json({token})
        })



    }catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");

    }

})


router.post("/login",[
    check("email","Enter a valid email").isEmail(),
    check("password","Password field is required").not().isEmpty()
],async(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;

    try {
        let user=await User.findOne({email});

        if(!user){
            return res.status(422).json({msg:"Invalid Credentials"});
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(422).json({msg:"Invalid Credentials"});

        }

        jwt.sign({_id:user._id},secret,{expiresIn:36000},(err,token)=>{
            if(err) throw err;
            res.json({token})
        })
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Internal Server Error");
    }

})


//get loggedIn user
router.get("/",auth,async(req,res)=>{
    try {
        // console.log(req.user);
        const user=await User.findById(req.user._id).select("-password");
        res.json(user)

    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Internal Server Error");
    }
})







module.exports=router;