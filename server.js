const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080|| 5000;
const mongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://webapps:webapps@ds157500.mlab.com:57500/webapps";



const server = express()
    .use(express.static(__dirname+"/page"))
    .use(bodyParser.json());
    
    
    







server.listen(PORT, () => console.log("roger, we are online...."));    