const express=require("express");
const { getContact,createContact,getContactid,updateContact,deleteContact } = require("../controllers/contactController");

const router=express.Router();

 router.route("/").get(getContact).post(createContact);
 router.route("/:id").get(getContactid).put(updateContact).delete(deleteContact);
 
 module.exports=router;