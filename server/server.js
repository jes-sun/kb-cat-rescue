const express = require("express");
const app = express();
const axios = require('axios');
const { MongoClient } = require("mongodb");
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const port = process.env.PORT || 8080;
const host = "0.0.0.0";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
let catApiKey = process.env.CAT_API_KEY;

const url = process.env.DB_URL;
const client = new MongoClient(url);
let database;

// const buildPath = path.join(__dirname, '../build');
// app.use(express.static(buildPath));
// console.log("Express serving", buildPath);

const server = app.listen(port, host, function () {
    const port = server.address().port

    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
        database = db.db("kbcr");
    })

    console.log("kbcr API listening at http://%s:%s", host,  port);
 })

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use(express.json());

////

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let catNamesList;
async function getCatNamesList() {
    if (!catNamesList) {
        try {
            const res = await database.collection("catNames").find({}).toArray()
            catNamesList = res
        } catch (err) {
            console.error((err))
        }
    }
    return catNamesList
}

let catBreedsList;
async function getCatBreedsList() {
    if (!catBreedsList) {
        const url = "https://api.thecatapi.com/v1/breeds"
        const response =  await axios(
            {
                method: "get",
                url: url,
                headers: {
                    "x-api-key": catApiKey
                }
            }
        )
        .catch(err => {
            console.error(err);
        })
        catBreedsList = response.data
    }
    return catBreedsList
}

async function getCatImage(breedId) {
    const url = "https://api.thecatapi.com/v1/images/search"
    const response = await axios(
        {
            method: "get",
            url: url,
            headers: {
                "x-api-key": catApiKey
            },
            params: {
                breed_id: breedId
            }
        }
    ).catch(err => {
        console.error(err)
    })
    imgSrc = response.data[0].url
    return imgSrc
}

function getCondition() {
    const conditionsList = [
        "deaf",
        "blind",
        "FIV+"
    ]
    let condition = "none"
    // Roll for chance of rarer condition
    if (getRandomInt(conditionsList.length*3) < conditionsList.length) {
        // Roll for condition
        condition = conditionsList[getRandomInt(conditionsList.length)]
    }
    return condition
}

async function generateCat() {
    const catBreedsList = await getCatBreedsList()
    const randomlySelectedBreed = catBreedsList[getRandomInt(catBreedsList.length)]
    const imgSrc = await getCatImage(randomlySelectedBreed.id)

    const catNamesList = await getCatNamesList()
    const randomlySelectedName = catNamesList[getRandomInt(catNamesList.length)]
    
    const randomlySelectedBirthYear = new Date().getFullYear() - (1 + getRandomInt(15))
    const randomlySelectedSex = getRandomInt(2) ? "Male" : "Female"
    const condition = getCondition() 
    
    const cat = {
        name: randomlySelectedName.name,
        sex: randomlySelectedSex,
        birthYear: randomlySelectedBirthYear,        
        condition: condition,
        image: imgSrc,
        info: randomlySelectedBreed
    }
    return cat
}

app.get("/api/generatecat", (req, res) => {
    generateCat()
    .then(cat => 
        {
            res.send(cat)
        })
    .catch(err => {
        console.error(err)
        res.send(false)
    })
})

app.post("/api/login", (req, res) => {
    console.log("Attempted login",req.body.username, req.body.password);
    const username = req.body.username
    try {
        database.collection("users").findOne({"username":{$regex: "^"+username+"$"}}, (err, user) => {
            if (err) throw err;
            if (user) {
                console.log("User", username, "found")
                bcrypt.compare(req.body.password, user.password, (err, passCheck) => {
                    if (err) throw err;
                    passCheck ? console.log("Password correct") : console.log("Password incorrect")
                    res.send(passCheck)
                })
            } else {
                console.log("User", username, "not found")
                res.send(false)
            }
        })
    } catch (err) {
        console.error(err)
    }
})

app.post("/api/checkUsername", (req, res) => {
    try {
        database.collection("users").findOne({"username":{$regex: "^"+username+"$"}}, (user) => {
            user ? res.send(true) : res.send(false)
        })
    } catch (err) {
        console.error(err)
        res.send(false)
    }
})

app.post("/api/register", (req, res) => {
    console.log("Attempted registration", req.body.username, req.body.password);
    const username = req.body.username

    try {
        database.collection("users").findOne({"username":{$regex: "^"+username+"$"}}, (user) => {
            if (!user) {
                console.log("Username", username, "available")
                bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                    if (err) throw err;
                    const newUser = { username: username, password: hash }
                    database.collection("users").insertOne(newUser, function(err, result) {
                        if (err) throw err;
                        console.log("New user", newUser);
                        res.send(true)
                    })
                })
            } else {
                console.log("Username", username, "not available")
                res.send(false)
            }
        })
    } catch (err) {
        console.error(err)
        res.send(false)
    }
    
})