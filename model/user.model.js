const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        unique: true,
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
})

const user=mongoose.model("Users", userSchema);
module.exports=user;