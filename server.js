const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );

const app = express();

const {Sports} = require("./models/sport-model");

/* 
You will need to code only one endpoint. The post endpoint:
i. Endpoint URL: /sports/addSport/:sportId
ii. Send in the body of the request the name, num_players, and the id of the sport. If any of
these three is not sent in the body of the request, you will send back a 406 status with an
appropriate message.
iii. Send as parameter the sportId, this sportId must match with the id sent in the body. If they
don’t match you will send back a 409 status with an appropriate message.
iv. If the id of the sport to be added already belongs to another sport you will have to send
back a 400 status with an appropriate message.
v. On a success post send back a 201 status with a json in the response holding the new sport

*/
app.post("/sports/addSport/:",jsonParser,(req,res)=>{
    console.log("creating a new sport :^)");


    let id = req.params.id;

    let bodyId = req.body.id;
    let name = req.body.name;
    let num_players = req.body.num_players;

    if(!bodyId || !name || !num_players){
        res.statusMessage = "missing params :^("
        return res.status(406).end()
    }
    if(bodyId != id){
        res.statusMessage = "body id and params id don't match :'("
        return res.status(409).end()
    }
    let newSport = {
        bodyId,
        name,
        num_players
    };
    Sports
        .createSport(newSport)
        .then(response=>{
            return res.status(201).end();
        })
        .catch(err=>{
            res.statusMessage = "couldn't insert or trying to insert duplicate id";
            return res.status(400).end()
        })
});


app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});