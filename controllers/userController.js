const  asyncHandler = require("express-async-handler");
const user = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//CRUD OPEARTIONS 
const registeruser= asyncHandler(async(req,res) =>   //routers
{
    //res.json({message : "register users "});
    // const contacts =  await Contact.find();
    // // res.status(200).json(contacts);
    // res.send(contacts);

    const { username ,email,password} = req.body;
    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory");

    }

    const userAvailable = await user.findOne({email});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("user already exists");
    }
    //hashpassword
    const hashedpassword = await bcrypt.hash(password,10);
    console.log("Hashed password : ",hashedpassword);
    const User = await user.create({
        username,
        email,
        password:hashedpassword,
    });

    //console.log("user created ${User}");
    if(User)
    {
        res.status(201).send({_id:User.id,email:User.email});
    }
    else{
        res.status(400);
        throw new Error("user data is not valid");
    }

    //res.json({message : "register users "});

});
const loginuser= asyncHandler(async(req,res) =>   //routers
{
    const {email,password} = req.body;
    if(!email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory !");

    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password)))

    {
       const accessToken = jwt.sign( {
        user :
        {
            username : user.username,
            email : emaail.username,
            id : user.id,
        },
       });
       res.status(200).json((accessToken));
    }
    res.json({message : "login users "});
    // const contacts =  await Contact.find();
    // // res.status(200).json(contacts);
    // res.send(contacts);
});
const currentuser= asyncHandler(async(req,res) =>   //routers
{
    // console.log("request body  ",req.body);
    // res.json({message : "current users "});
     const users =  await user.find();
    // // res.status(200).json(users);
     res.send(users);
});

module.exports={registeruser,loginuser,currentuser};