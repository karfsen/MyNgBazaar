var http = require("http");
const app = require('express')();
const cors=require('cors');
const mysql = require('mysql');

app.use(cors());

let con=mysql.createConnection({
  host: "localhost",
  user: "hamster",
  password: "1605",
  database: "hamster",
  port: "3307"
});
con.connect();


app.get("/getads",(req,res)=>{
    callback=function(status,result){
        res.status(status).send(result);
    }
    console.log("request on /getads");
    con.query("SELECT * from Inzeraty" ,(err,res)=>{
        if(err) throw err;
        callback(200,res);
    });
});



app.listen(2000,()=>{
    console.log("server listening on port 2000");
});