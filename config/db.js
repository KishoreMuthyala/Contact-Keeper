const mongoose=require("mongoose");
const config=require("config");
const uri=config.get("mongoURI");

const DBConnection=async()=>{
    try{
        await mongoose.connect(uri,{useUnifiedTopology: true,useNewUrlParser: true});
        console.log('db Connected');
    }catch(err){
        console.log(err.message);
    }
}

module.exports=DBConnection;