

const express = require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const UserModel = require("./models/UserModel");
const app=express();
// create server to be used with socket.io
const http = require("http");
const {Server}=require('socket.io');
//create http server with express
const server=http.createServer(app);


const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
 myCache.mset([
    {key: "rooms", val: [], ttl: 10000},
])


const {v4:uuidV4}=require('uuid');
require('dotenv').config();

const rooms:string[]=[]


const bcryptSalt=bcrypt.genSaltSync(8);

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        methods:["GET","POST"]
    }   ,
});

mongoose.connect(process.env.MONGO_URL);

/*
io.on("connection",(socket)=>{

    socket.on("join_video_room",(data)=>{
        console.log(data.room,data.user);
        socket.join(data.room);
        socket.to(data.room).emit("user_connected",data.user);
    });
})*/


io.on("connection",(socket)=> {
    console.log(`Ùser connected ${socket.id}`); //will display as many time as many users are connected
    socket.on("join_room", (room) => {

        socket.join(room);
    })
})
 /*   socket.on("send_message",(data)=>{
             console.log(data.user);
             //send data to all users connected to the server
        //broadcast send to everyone except yourself
         socket.broadcast.emit("receive_message",data);

        //send to specific user
         //socket.to(str(room1)).emit(/* ... *///);
// socket.to(data.room).emit("receive_message",data);
//});


//})




app.post('/signup', async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        //create user in the database
        const userInfo = await UserModel.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        res.json(userInfo);
    }
    catch(e){
        res.status(422).json(e);
    }
    //response

});

app.post('/login', async (req,res)=>{
    const {loginEmail,loginPassword}=req.body;
    const email=loginEmail;
    const password=loginPassword;
    //find user with this email in the databse
    const userInfo = await UserModel.findOne({email})
    if(userInfo)    {
        const passOk=bcrypt.compareSync(password,userInfo.password)
        if(passOk){
            const accessToken = generateAccessToken(userInfo);
            console.log('accessToken');
            console.log(userInfo.email);
            console.log(accessToken);
            res.json({accessToken});

        }
        else{
            res.status(422).json('password is incorrect');
        }
    }
    else{
        res.json('user not found');
    }

});

app.get('/profile',authenticateToken,async (req,res)=> {
    res.json(req.user);

});


app.get('/createRoom',authenticateToken,async (req,res)=> {
    const roomId=uuidV4();
    let value = myCache.get( "rooms" );
    if ( value == undefined ){
        console.log("this object is not in the cache")
    }
    //const roomObj = { id: roomId, owner: req.user._id }; create new type room
    value?.push({id:roomId,owner:req.user._id})
    myCache.mset([
        {key: "rooms", val: value, ttl: 10000},
    ])
    res.json(value);

});

app.post('/deleteRoom',authenticateToken,async (req,res)=> {
    const {room}=req.body;
    let value = myCache.get( "rooms" );
    if ( value == undefined ){
        console.log("this object is not in the cache")
    }
    value = value?.filter((val) => val.id!==room.id);
    myCache.mset([
        {key: "rooms", val: value, ttl: 10000},
    ])
    res.json(value);

});

app.get('/getRooms',authenticateToken,async (req,res)=> {
    let currentRooms = myCache.get( "rooms" );
    if ( currentRooms == undefined ){
        console.log("this object is not in the cache")
    }
    res.json(currentRooms);

});

app.get('/chat/:room',async (req,res)=> {
    //res.render('room',{roomId:req.params.room});
    console.log('here');
    res.sendStatus(201);


});





function authenticateToken(req,res,next){
    const authHeader=req.headers.authorization;
    const accessToken = authHeader.split(" ")[1]
    if (accessToken==null){
        return res.sendStatus(401);
    }
    else{
        jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,async (err,user)=>{
            if (err) res.sendStatus(403);
            const {email}=user;
           // console.log(email);
            const userInfo = await UserModel.findOne({email: email});
            req.user=userInfo;
            next()
        });
    }

}

function generateAccessToken(userInfo){
    return jwt.sign({email:userInfo.email, id:userInfo._id,},process.env.ACCESS_TOKEN_SECRET,{});//15m
}


//app.listen(3000);
server.listen(3000,()=>{
    console.log("server is running");
});