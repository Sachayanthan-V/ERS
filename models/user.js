const mongoose = require('mongoose');


// The Schema which is holding all kind of user data's inside it.
const userSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String, 
        required: true
    }, 
    name: {
        type : String, 
        required : true
    },
    emptype : {
        type : String,
        required : true 
    }, 
    reviewlist : {
        type : [String], 
    },
    rating : {
        type : Number,
    },
    finalrating : {
        type : Number,
    },
    isreview : {
        type : Boolean,
    },
    userRated : {
        type : Number
    }

}, {
    timestamps : true
});

const User = mongoose.model('User', userSchema);

module.exports = User;