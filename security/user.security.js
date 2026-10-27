const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const userModel=require("../model/user.model");

const registerUser = async(req,res) =>{
    try {

        const {username,email,password,role}=req.body;
        if(!username || !email || !password || !role){
            return res.status(400).json({success:false, message: "Please fill all details"});
        }
        
        const emailExists = await userModel.findOne({email});
        if(emailExists){
            return res.status(404).json({success:false, message:"User already Exists"});
        }

        const passwordHash= await bcrypt.hash(password,10);
        const newUser = await userModel.create({username,email,password:passwordHash,role});
        return res.status(200).json({success:true, message:"User registered successfully", newUser});
    }

    catch(err) {
        return res.status(500).json({success:false, message:"Sorry, Unable to register user. Try again later"});
    }
}

const loginUser = async(req,res) =>{

    try {

        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).json({success:false, message:"Incorrect Password and Email"});
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck) {
            return res.status(404).json({success:false, message:"Incorrect Password and Email"});
        }

        const token = jwt.sign(
            {userid: user._id, email: user.email, role: user.role},
            process.env.secret_key,
            {expiresIn: "24hr"}
        );

        return res.status(200).json({success:true, message:"Login Successful", token})

    }

    catch (err)
    {
        return res.status(500).json({success:false, message:"Login Failed"});
    }
}

module.exports={registerUser, loginUser};