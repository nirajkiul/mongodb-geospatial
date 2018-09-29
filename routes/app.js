const express = require("express");
var mongojs = require('mongojs');
var db = mongojs('geo');

const Places = require("../models/places.model");

const router = express.Router();

router.post("/insert", (req, res, next) => {
    //We can post the hardcoded value or pass as an query and store in database

    //Entered hardcoded value
    db.places.insert( {
       name: "Biryani Zone",
       location: { type: "Point", coordinates: [ -73.97, 40.77 ] },
       emotion: "happy"
    } );
    db.places.insert( {
        name: "Biryani Zone",
        location: { type: "Point", coordinates: [ -73.97, 40.77 ] },
        emotion: "happy"
     } );
    db.places.insert( {
       name: "Biryani Zone",
       location: { type: "Point", coordinates: [ -73.97, 40.77 ] },
       emotion: "happy"
    } );

    db.places.insert( {
       name: "Sara D. Roosevelt Park",
       location: { type: "Point", coordinates: [ -73.9928, 40.7193 ] },
       emotion: "angry"
    } );

    db.place.insert( {
       name: "Polo Grounds",
       location: { type: "Point", coordinates: [ -73.9375, 40.8303 ] },
       emotion: "sad"
    } );

    db.places.createIndex( { location: "2dsphere" } );

    res.send("ok");
 
});

router.get("/insert", (req, res, next) => {

    var pipeline = [
        {
            $geoNear: {
               near: { type: "Point", coordinates: [ -73.9667, 40.78 ] },
               spherical: true,
               distanceField: "distance"
            }
         },
         { $group : { _id : "$location", emotions: { $push: "$emotion" }, distance: { $push: "$distance" }} }
    ];

    var resArr = [];
     Places.aggregate(pipeline, function(err, result){
        
        if(result)
        result.forEach(element => {

                //count the emotions
                let happy = 0;
                let angry = 0;
                let sad = 0;
                let neutral = 0;

                if(element.emotions)
                element.emotions.forEach(element => {
                    if(element == 'happy'){
                        happy++;
                    }
                    if(element == 'angry'){
                        angry++;
                    }
                    if(element == 'sad'){
                        sad++;
                    }
                    if(element == 'neutral'){
                        neutral++;
                    }
                }) 

                let obj = {
                                lat: element._id.coordinates[0],
                                long: element._id.coordinates[1],
                                angry: angry,
                                happy: happy,
                                sad: sad,
                                neutral: neutral,
                                distance: element.distance[0],
                            };

                resArr.push(obj);
                
        });
        res.status(200).json(resArr);
     });
});


module.exports = router;