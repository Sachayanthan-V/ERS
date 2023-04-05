const mongoose = require('mongoose');

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
    feedbacklist : {
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