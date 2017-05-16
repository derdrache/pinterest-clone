const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080|| 5000;
const mongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://webapps:webapps@ds157500.mlab.com:57500/webapps";



const server = express()
    .use(express.static(__dirname+"/page"))
    .use(bodyParser.json());
    
/* home - Show all Pins*/    
server.get("/home", function(req,res){
   mongoClient.connect(dburl, function(err,db){
       if (err) throw err;
       
        db.collection("beMotivatedPins").find({}).toArray(function(err,result){
            if (err) throw err;
            
            var allPins =[];
            result.forEach(function(data){
                if (data.pins){
                    for (var i = 0; i<data.pins.length;i++){
                        allPins.push(data.pins[i]);
                    }                   
                }
            })
            res.send(allPins);
        })
    db.close();    
   })
});

/* new user - check and insert */    
server.post("/signUp", function(req,res){
    mongoClient.connect(dburl, function(err,db){
        if (err) throw err;
        
        db.collection("beMotivatedUserData").find({}).toArray(function(err,result){
            if (err) throw err;
            
            var check = false;
            for (var i = 0; i<result.length; i++){
                if (req.body.name.toLowerCase() == result[i].user){
                    check = "Name schon in Verwendung";
                    break;
                }
                if (req.body.email.toLowerCase() == result[i].email){
                    check = "Email schon in Verwendung";
                    break;
                }
            }
            
            if (check == false) {
                db.collection("beMotivatedUserData").insert({
                    user: req.body.name.toLowerCase(),
                    email: req.body.email.toLowerCase(),
                    password: req.body.password
                });
                db.collection("beMotivatedPins").insert({
                    "user": req.body.name.toLowerCase()
                });
                check= true;
            }
        res.send(check);
        db.close();    
        });
    });
});

/* Google User DB Check*/
server.post("/home", function(req,res){
    
    mongoClient.connect(dburl, function(err,db){
        if (err) throw err;
        
        db.collection("beMotivatedPins").find({"user": req.body.user.toLowerCase()}).toArray(function(err,result){
            if (err) throw err;
            
            if (result.length == 0){
                db.collection("beMotivatedPins").insert({
                    "user": req.body.user.toLowerCase()
                });
            }
        });
    });
});

/* Login */
server.post("/login", function(req,res){
    mongoClient.connect(dburl, function(err,db){
        if (err) throw err;
        
        var check;
        db.collection("beMotivatedUserData").find({"user": req.body.name.toLowerCase()}).toArray(function(err,result){
            if (err) throw err;
            
            if (result.length>0 && result[0].password == req.body.password){
                check = true;
            } else{
                check = "Benutzer oder Passwort falsch";
            }
        res.send(check);
        db.close();
        });
    });
});

/* userHome - New Pen*/    

server.post("/userHome", function(req,res){
    
    mongoClient.connect(dburl, function(err,db){
        if (err) throw err;
        
        
        db.collection("beMotivatedPins").update(
          {"user": req.body.user.toLowerCase()},
          {
              $push: {
                  "pins": {
                      "title": req.body.title,
                      "img": req.body.img
                  }
              }
             
          }
        );
        
    db.close();    
    });
});

server.post("/myPins", function(req,res){
    
    mongoClient.connect(dburl, function(err,db){
        if (err) throw err;
        
        /**/
        if (req.body.user){
            db.collection("beMotivatedPins").find({"user": req.body.user.toLowerCase()}).toArray(function(err, result){
                if (err) throw err;
                
                res.send(result[0].pins);
            });
        }
        
        /* Pin löschen */
        if (req.body.pin){
            console.log(req.body)
            
            db.collection("beMotivatedPins").update(
              {"user": req.body.pin.user},
              {
                  $pull: {
                     "pins":{
                         "title": req.body.pin.title,
                         "img": req.body.pin.img
                     } 
                  }
              }
                
            )
        res.send("done");    
        }
        
    db.close();    
    });
});






server.listen(PORT, () => console.log("roger, we are online...."));    