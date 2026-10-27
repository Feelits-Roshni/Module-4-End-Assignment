const express = require("express");
const router = express.Router();
const userSecurity=require("../security/user.security");
const userController=require("../controller/user.controller");
const authMiddleware=require("../middleware/authMiddleware");

router.post("/register", userSecurity.registerUser);
router.post("/login", userSecurity.loginUser);

router.get("/view", authMiddleware("admin"), userController.viewUsers);
router.post("/save", authMiddleware("admin"), userController.addUsers);
router.delete("/delete/:id", authMiddleware("admin"), userController.deleteUser);




module.exports=router;