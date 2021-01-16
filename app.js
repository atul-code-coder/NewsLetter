const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email =req.body.Email;

  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        marge_field:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData=JSON.stringify(data);
  const url="https://us7.api.mailchimp.com/3.0/lists/eaba01bdf5";
  const options={
    method:"POST",
    auth:"atul:se9f10db29d6a31ce3163eb12e1a0bb6f-us7"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT,function(){
  console.log("Server is running on port 3000.");
});


// api key
// e9f10db29d6a31ce3163eb12e1a0bb6f-us7
//
// List id
// eaba01bdf5
