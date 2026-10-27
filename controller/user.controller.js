const userModel = require("../model/user.model");
const bcrypt=require("bcryptjs");

const viewUsers = async(req,res) =>{

    try {

        const vusers = await userModel.find();
        if(!vusers) {
            return res.status(400).json({success:false, message:"No Users Found"});
        }

        return res.status(200).json({success:true, message:"Users Details Displayed", vusers});
    }

    catch(err)
    {
        return res.status(500).json({success:false, message:"Users details cannot be Displayed"});
    }
}

const addUsers = async(req,res) =>{

    try {
     
        const {username,email,password,role}=req.body;
        if(!username || !email || !password || !role){
            return res.status(400).json({success:false, message:"User details Missing"});
        }

       const emailExists = await userModel.findOne({email});
        if(emailExists){
            return res.status(404).json({success:false, message:"User already Exists"});
        }

        const passwordHash= await bcrypt.hash(password,10);
        const newUser = await userModel.create({username,email,password:passwordHash,role});
        return res.status(200).json({success:true, message:"User added successfully", newUser});
    }

    catch(err)
    {
      return res.status(500).json({success:false, message:"User cannot be Added"});   
    }
}

const deleteUser = async(req,res) =>{

    try {
     
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if(!deletedUser) {
            return res.status(400).json({success:false, message:"User is not available"}); 
        }

         return res.status(200).json({success:true, message:"User deleted successfully", deletedUser});
   
        }

    catch(err) 
    {
     return res.status(500).json({success:false, message:"User cannot be Deleted"});   
    }
}

module.exports={viewUsers, addUsers, deleteUser};