const productModel= require("../model/product.model");

const viewProducts = async(req,res) =>{

    try {

        const vproducts = await productModel.find();
        if(!vproducts) {
            return res.status(400).json({success:false, message:"No Products Found"});
        }

        return res.status(200).json({success:true, message:"Products Displayed", vproducts});
    }

    catch(err)
    {
        return res.status(500).json({success:false, message:"Products cannot be Displayed"});
    }
}

const addProducts = async(req,res) =>{

    try {
     
        const {pname,color,price,quantity,image}=req.body;
        if(!pname || !color || !price || !quantity || !image){
            return res.status(400).json({success:false, message:"Product details Missing"});
        }

        const addedProduct=await productModel.create({pname,color,price,quantity,image});
        return res.status(200).json({success:true, message:"Product added Successfully", addedProduct});

    }

    catch(err)
    {
      return res.status(500).json({success:false, message:"Product cannot be Added"});   
    }
}

const updateProduct = async(req,res) =>{

    try {
     
         const {pname,color,price,quantity,image} =req.body;
       
       const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updatedProduct) {
            return res.status(400).json({success:false, message:"Product is not available"}); 
        }
       return res.status(200).json({success:true, message:"Product updated Successfully", updatedProduct});
    
    }

    catch(err)
    {
      return res.status(500).json({success:false, message:"Product cannot be Edited"});   
    }
}

const deleteProduct = async(req,res) =>{

    try {
     
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if(!deletedProduct) {
            return res.status(400).json({success:false, message:"Product is not available"}); 
        }

         return res.status(200).json({success:true, message:"Product deleted successfully", deletedProduct});
   
        }

    catch(err) 
    {
     return res.status(500).json({success:false, message:"Product cannot be Deleted"});   
    }
}

module.exports={viewProducts, addProducts, updateProduct, deleteProduct};