//jshint esversion:6
const express = require('express');
const app = express();
const request = require('request');
const https = require('https');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const res = require('express/lib/response');
app.use(bodyParser.urlencoded({ extended: true }));

//To use all static files like styles.css  
app.use(express.static("public"));


app.get('/', (req, res) => {
    console.log('Uhmm!! I think its running...');

    res.sendFile(__dirname + "/signup.html");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("App is running at port 3000 <3");
})
function goback() {
    
}
app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const ListId = "7999aeedcf";
    const url = "https://us10.api.mailchimp.com/3.0/lists/" + ListId;

    const options = {
        method: 'POST',
        auth: "john:6725f2ed4a0d945769ca9ec17a847717-us10"
    }
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const request = https.request(url, options, (response) => {
        if (response.statusCode == 200)
        {
            res.sendFile(__dirname + '/success.html');
        }
        else {
            res.sendFile(__dirname + '/failure.html');
        }
        response.on('data', (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});




//Api kEy :  6725f2ed4a0d945769ca9ec17a847717-us10



