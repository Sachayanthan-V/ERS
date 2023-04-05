const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ERSv2');

const db = mongoose.connection;

db.on('error', (err)=>{console.log(`Error occured while connecting to DB ::  mongodb \n Error : ${err}`)});

db.once('open', ()=>{console.log(`Successfully connected to the database :: mongodb`)});

module.exports = db; // check this out.