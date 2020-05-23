//POTREBNE DEKLARACIE
var http = require("http");
const express = require('express');
const app = express();
const cors=require('cors');
const mongo = require('mongodb');
var crypto = require('crypto');
const TokenGenerator = require('uuid-token-generator');
//doplňujúce  deklaracie
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";
let db;
app.use(express.json());
app.use(cors());
const tokgen = new TokenGenerator(128, TokenGenerator.BASE62);
//TOKENY
let tokens=new Array();
//API

app.post("/login",(req,res)=>{
    console.log("request on /login");
    let hashedPw  = crypto.createHash('md5').update(req.body.password).digest('hex');

    db.collection("users").find({username:req.body.username,password:hashedPw}).toArray(function(err, result) {
        if (err) throw err;
        token=tokgen.generate();
        let json={_id:result[0]._id,username:req.body.username,token:token};
        const index = tokens.findIndex(x => x.username === json.username);
        if (index !== -1) tokens.splice(index, 1);
        tokens.push(json);
        console.log(tokens);
        res.status(200).send(json);
      });
});

app.post("/logout",(req,res)=>{
    console.log("request on /logout");
    const index = tokens.findIndex(x => x.token === req.body.token);
    if (index !== -1){ 
        tokens.splice(index, 1);
        console.log(tokens);
        res.status(200).send("Successfully logged out!")
    }
    else{
        res.status(401).send("Wrong user token.");
    }
});

app.post("/register",(req,result)=>{
    console.log("request on /register");
    let hashedPw  = crypto.createHash('md5').update(req.body.password).digest('hex');
    db.collection("users").find({username:req.body.username}).toArray(function(err,res){
        if(err) throw err;
        console.log(res);
        if(res.length!=0){
            result.status(403).send("This username is already taken!");
        }else{
            db.collection("users").insertOne({username:req.body.username,password:hashedPw},function(err, res) {
                if (err) throw err;
                result.status(200).send("Register Successful!");
              });
        }
    })
});

app.get("/getads",(req,res)=>{
    console.log("request on /getads");

    db.collection("ads").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.status(200).send(result);
      });
});

app.post("/myads",(req,res)=>{
    console.log("request on /myads");
    const index = tokens.findIndex(x => x.token === req.body.token);
    if (index !== -1){ 
        let query={ userID:req.body._id};
        console.log(query);
        db.collection("ads").find(query).toArray(function(err, result) {
            if (err) throw err;
            res.status(200).send(result);
        });
    }
    else{
        res.status(401).send("Wrong user token");
    }
});

app.post("/newad",(req,res)=>{
    console.log("request on /newad");
    const index = tokens.findIndex(x => x.token === req.body.token);
    if (index !== -1){ 
        db.collection("ads").insertOne(req.body, function(err, result) {
            if (err) throw err;
            res.status(200).send("New ad successfully added!");
        });
    }
    else{
        res.status(401).send("Wrong user token");
    }
});

app.post("/editad",(req,res)=>{
    console.log("request on /editad");
    const index = tokens.findIndex(x => x.token === req.body.token);
    if (index !== -1){ 
        let myquery = { _id:new mongo.ObjectID(req.body._id) };
        let newvalues={ $set: {title : req.body.title,text:req.body.text,price:req.body.price } };
        db.collection("ads").updateOne(myquery, newvalues, function(err, result) {
            if (err) throw err;
            res.status(200).send("Successfully edited ad.")
        });
    }
    else{
        res.status(401).send("Wrong user token")
    }
});

app.post("/deletead",(req,res)=>{
    console.log("request on /deletead");
    const index = tokens.findIndex(x => x.token === req.body.token);
    if (index !== -1){ 
        let myquery = { _id:new mongo.ObjectID(req.body._id) };
        db.collection("ads").remove(myquery,  function(err, result) {
            if (err) throw err;
            res.status(200).send("Successfully deleted ad.")
        });
    }
    else{
        res.status(401).send("Wrong user token")
    }
});


MongoClient.connect(url, function(err, database) {
    if(err) throw err;
    db = database.db("bazaar");
});

app.listen(2000,()=>{
    console.log("server listening on port 2000");
});