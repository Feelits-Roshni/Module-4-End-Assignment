const mongoose = require("mongoose");
const productSchema=mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
})

const product = mongoose.model("Products", productSchema);
module.exports=product;