const express = require("express");
const request = require("request");
const https = require("https");
const { response } = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName =  req.body.first;
    const lastName = req.body.last;
    const email = req.body.email; 
    
    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/7f52b2b7ce";

    const options = {
        method: "POST",
        auth : "vivek:3f70cf65806a3eea5d7c403a035fea51-us5"
    }

    const request = https.request(url, options, function(response){
        console.log(response.statusCode);
        if(response.statusCode === 200){
            // res.send("sucess");
            res.sendFile(__dirname + "/success.html");
        }
        else{
            // res.send("failure");
            res.sendFile(__dirname + "/failure.html");
        }

        // response.on("data", function(data){
        //     console.log(JSON.parse(data));
        // });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started at port 3000");
})