const express=require("express");
const request= require("request");
const bodyParser = require("body-parser");
const https= require("https");

const app= express();

app.use('*/css',express.static(__dirname+'/public/css'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html")
});


app.post("/", function (req,res) {

   var firstName= req.body.fname;
   var lasttName= req.body.lname;
   var email= req.body.email;

   var data ={
     members: [
       {
         email_address:email,
         status:"subscribed",
         merge_fields:{
           FNAME: firstName,
           LNAME: lasttName
         }
       }
     ]
   }

   var jsonData =JSON.stringify(data);

   url="https://us7.api.mailchimp.com/3.0/lists/8afa58d9c3"

   const options={

     method:"POST",
     auth:"aadeshm3:2b81bf455bfdc3176830dd76d3feccd7-us7"
   }

   const request= https.request(url,options,function (response) {

     if(response.statusCode===2000){
       res.sendFile(__dirname+"/success.html");
     } else{
       res.sendFile(__dirname+"/failure.html");
     }

     response.on("data",function (data) {
       console.log(JSON.parse(data));

     })

   })

request.write(jsonData);
request.end();


});

app.post("/failure", function (req, res) {

  res.redirect("/");

});

app.listen(process.env.PORT ||3000,function () {

  console.log("Server is running");

});




//api key //2b81bf455bfdc3176830dd76d3feccd7-us7

//user id
