const asyncHandler=require('express-async-handler')
const Contact= require("../Model/contactModel.js");

const getContact= asyncHandler(async(req,res) =>   //routers
{
    // res.send("get all contacts");
    const contacts =  await Contact.find();
    // res.status(200).json(contacts);
    res.send(contacts);
});
const createContact = asyncHandler(async(req,res) =>   //routers
{
    // res.send("get all contacts");
    // console.log("request body  ",req.body);
    const {name,email,phone}=req.body;
    if(!name||!email||!phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory");  //if contact is not there
    }
    const contacts = await Contact.create(
        {
            name,email,phone
        }
    );
    // res.status(200).json(contacts);
    res.send(contacts);

});
const getContactid =  asyncHandler(async(req,res) =>   //routers
{
    // res.send("get all contacts");
    const contacts= await Contact.findbyId(req.params.id);
    if(!contacts)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contacts);
    res.send(contacts);
});
const updateContact = asyncHandler(async(req,res) =>   //routers
{
    // res.send("get all contacts");

    const contacts= await Contact.findbyId(req.params.id);
    if(!contacts)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    const updatedContact = await Contact.findbyIdAndUpdate
    {
        req.params.id,
        req.body,
        {
            new:true
        };
    }
    // res.status(200).json({message:`Update contacts for ${req.params.id}`});
    res.status(200).json(updatedContact);
    res.send(updatedContact);
});
const deleteContact =  asyncHandler(async(req,res) =>   //routers
{
    // res.send("get all contacts");
    const contacts= await Contact.findbyId(req.params.id);
    if(!contacts)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    await Contact.remove();
    res.status(200).json(contacts);
    res.send(contacts);
});
module.exports={getContact,createContact,getContactid,updateContact,deleteContact};