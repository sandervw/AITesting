//TECHS USED
/*
Node.js (backend JS)
Express (server)
Nodemon (auto reload code on save)
doteven (Environmental variables ignored by git)
*/

require('dotenv').config();

const express = require('express');
const promptRoutes = require('./routes/prompts');

//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => { //next says 'move to next function'
    console.log(req.path, req.method); //For logging (instead of Morgan)
    next();
})

//routes
app.use('/api/prompts', promptRoutes)

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port 4000');
})