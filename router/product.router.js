const express=require("express");
const router=express.Router();
const productController = require("../controller/product.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/view", authMiddleware(), productController.viewProducts);
router.post("/save", authMiddleware("admin"), productController.addProducts);
router.put("/update/:id", authMiddleware("admin"), productController.updateProduct);
router.delete("/delete/:id", authMiddleware("admin"), productController.deleteProduct);

module.exports=router;
