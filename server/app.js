const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
var nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"register"
})

app.post("/register",(req,res)=>{
    const email=req.body.email;
    const mobile=req.body.mobile;
    const password=req.body.password;

    db.query("INSERT INTO `xceltec`(email,mobile,password) VALUES(?,?,?)",
    [email,mobile,password],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);    
        }
    })
});

app.post("/verify",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    
    db.query("SELECT * FROM `xceltec` WHERE email=? AND password=?",
    [email,password],
    (err,result)=>{
        if(err){
            res.json({success:false,err:err,message:"Registered Successfully"});
        }else{
            if(result.length>0){
                res.json({success:true,result:result,message:"User Already Registered"})
            }
            else{
                res.json({success:false,err:err,message:"Registered Successfully"})
            }
        }
    })
})
app.post("/login",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    db.query("SELECT * FROM `xceltec` WHERE email=? AND password=?",
    [email,password],
    (err,result)=>{
        if(err){
            res.json({success:false,err:err,message:"User Not Found"});
        }else{
            if(result.length>0){
                res.json({success:true,result:result,message:"Login Successfully"})
            }else{
                res.json({success:false,err:err,message:"User Not Found"})
            }
        }
    })
})
app.get("/get", (req, res) => {
    db.query("SELECT * FROM `xceltec`", (error, result) => {
      res.send(result);
    });
  });
  app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM `xceltec` WHERE id=?";
    db.query(sqlRemove, id, (error, result) => {
      if (error) {
        console.log(error);
      }
    });
  });
  app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlget = "SELECT * FROM `xceltec` WHERE id=?";
    db.query(sqlget, id, (error, result) => {
      if (error) {
        res.json({ success: false, error: error });
        console.log(error);
      } else {
        res.json({ success: true, result: result });
      }
    });
  });
  
  app.put("/api/put/:id", (req, res) => {
    const { id } = req.params;
    const { email, mobile, password } = req.body;
    const sqlupdate =
      "UPDATE `xceltec` SET email=?,mobile=?,password=? WHERE id=?";
    db.query(
      sqlupdate,
      [email, mobile, password, id],
      (error, result) => {
        if (error) {
          res.json({ success: false, error: error });
          console.log(error);
        } else {
          res.json({ success: true, result: result });
        }
      }
    );
  });


  app.post("/otp", (req, res) => {
      console.log(req.body.email);
    const email = req.body.email;
    var otp = Math.floor(1000 + Math.random() * 9000);

    db.query(
      "INSERT INTO `otp`(`otp`) VALUES (?)",
      [ otp],
      (err, result) => {
        console.log(result)
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "kushvdarji@gmail.com",
            pass: "lequgskpfswekfre",
          },
        });

        var mailOptions = {
          from: "kushvdarji@gmail.com",
          to: email,
          subject: "For OTP",
          text:
            "Your OTP for verification is : " +
            otp +
            " Please Don't Share this to anyone",
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        console.log(err);
      }
    );
  });
  app.post("/otpverify", (req, res) => {
  
      const otp = req.body.otp;
      db.query(
        "SELECT * FROM `otp` WHERE otp=?",
        [otp],
        (err,result)=>{
          if(err){
            res.json({success:false,err:err,message:"otp not verified"})
          }else{
            if(result.length>0){
              res.json({success:true,result:result,message:"otp verified"})
            }else{
              res.json({success:false,err:err,message:"Otp Is not Verified"})
            }
          }
        }
      );
  });
  
  
app.listen(7000,()=>{
    console.log("Server Connected")
})