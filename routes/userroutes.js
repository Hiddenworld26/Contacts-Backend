const express= require("express");
const { registeruser, loginuser, currentuser } = require("../controllers/userController");

const router=  express.Router();
  

//     // app.get("/api/contacts",(req,res)=>   //routers
// {
//     // res.send("get all contacts");
//     res.status(200).json({message:"get all contacts"});
// });

router.route('/register').post(registeruser);

router.route('/login').post(loginuser);

router.route('/current').get(currentuser);

module.exports=router;

