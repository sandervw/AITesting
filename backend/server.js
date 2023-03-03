//TECHS USED
/*
Node.js (backend JS)
Express (server)
MongoDB (DB)
Mongoose (Object Data Modeling for Mongo)
Nodemon (auto reload code on save)
doteven (Environmental variables ignored by git)
*/

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const promptRoutes = require('./routes/promptRoutes');

//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => { //next says 'move to next function'
    console.log(req.path, req.method); //For logging (instead of Morgan)
    next();
})

//routes
app.use('/api/prompts', promptRoutes);

//connect to DB (async)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(process.env.MONGO_URI);
        console.log(err);
    })