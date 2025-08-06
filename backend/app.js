const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const port = 3000;
app.listen(port,err=>{
    if(err){
        console.log(err)
    }
    console.log(`The Server is running on localhost:${port}`)
})

app.use(express.static(path.join(__dirname,"../locals")))

app.set('view engine','ejs');
app.set('views',path.join(__dirname,"../locals"))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/api/sent",(req,res)=>{

   const transport = nodemailer.createTransport({
    host: req.body.host,
    port:req.body.port,
    secure:req.body.type,
    auth:{
        user:req.body.user,
        pass:req.body.pass,
    }
   })
   const mailOptions = {
    from:req.body.from,
    to:req.body.to,
    subject:req.body.sub,
    html:req.body.body,
   }
   transport.sendMail(mailOptions,(err,info)=>{
    if(err){
        res.json(err.name);
    }
    res.json(info);
   })
})
