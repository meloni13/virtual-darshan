const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config();
const data = require('./dataTemp.json');
const images = require('./images.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // path
app.use(express.static(path.join(__dirname, "public")));

// mongoose.connect(process.env.DB_LINK);
// mongoose.connection.on("error", (e) => {
//     console.log(e.message);
// });
// mongoose.connection.once("open", () => {
//     console.log("connected to db");
// });

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/gp/:gid/p/:pid', (req, res) => {
    // console.log(images)
    const { gid: groupid, pid: placeid } = req.params; // group and place id
    let mapLink = undefined;
    let places = undefined;
    for (let obj of data) {
        if (obj.name.toLowerCase() === groupid.toLowerCase()) {
            places = obj.place_to_visit;
            mapLink = obj.map
        }
    }

    // console.log(places);
    let place = undefined;
    for (let place1 of places) {
        if (place1.subname.toLowerCase() === placeid.toLowerCase()) {
            place = place1
        }
    }
    console.log(place)
    res.render("place", { place, places, groupname: groupid, mapLink, images });

    // res.send("Hello")
})

app.get('/about', (req, res) => {
    res.render('about');
})
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})
