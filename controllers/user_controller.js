const passport = require('passport');
const User = require('../models/user');

// function for user sign up ::

module.exports.signUp = function(req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/users');
    }

    return res.render('user_sign_up', {
        title : "codial sign up"
    });

}

// function for user sign in ::

module.exports.signIn = function(req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users');
    }
    
    return res.render('user_sign_in', {
        title : "codial sign in"
    });
}

// create a new user if they register ::

module.exports.create = function(req, res) { 

    // if both password not match return to same page to do it again.
    if ( req.body.password != req.body.confirm_password ) {
        req.flash('success', 'password doesnt match');
        return res.redirect('back');  
    }

    User.findOne( {email : req.body.email} ) 
        .then((user)=>{

            if (!user) {

                User.create( req.body )

                    .then((newuser)=>{  
                        req.flash('success', 'Account Created Successfully!...');
                        return res.redirect('/users/sign-in');
                    })
                    .catch((err)=>{

                        if(err){console.log(`Error while creating a user during signing up`); return; }
                    })
                
            }
            if (user) {
                
                req.flash('success', 'User Name is already Exists');
                return res.redirect('back');
            }

        })
        .catch((err)=>{
            if(err){console.log(`Error while finding a user during signing up`); return; }
        })

}

// create an session for the user who is loggin in
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in successfully');
    return res.redirect('/users');
}


// destroying session while user trying to logout.
module.exports.destroySession = function(req, res) {
    req.flash('success', 'Logged out successfully');
    req.logout( function(err){ console.log('Logout Error : ', err) } );
    // req.session.destroy();
    return res.redirect('/');
}


// This is delete operation to delete an particular employee from the database done only by admin.
module.exports.deleteEmp = async function(req, res) {

    await User.findByIdAndDelete(req.params.id)
              .then((user)=>{ console.log(`Employee is deleted :: \n ${user}`); })
              .catch((err)=>{ console.log(`Error occured while deleting a Employee :: \n ${err}`); });

    return res.redirect('back');

}


// This function is make a normal user to admin, and its only accessible by admin
module.exports.makeAdmin = async function(req, res){

    await User.findByIdAndUpdate(req.params.id, {emptype : "Admin"})
              .then((user)=>{ console.log(`Employee ${user.name} is now Admin!..`); })
              .catch((err)=>{ console.log(`Error while changing Employee to Admin :: \n ${err} `); });
    
    return res.redirect('back');

}

// function to update an final rating. no rating should not able update after this. This is only accessible by the admins.
module.exports.updateFinalRating = async function(req, res) {

    console.log( "BODY :: => ",  req.body.updatedFinalRating, req.params.id );

    await User.findByIdAndUpdate(req.params.id, {finalrating : req.body.updatedFinalRating })
              .then((user)=>{console.log(`User Final Rating is updated as ${req.body.updatedFinalRating} to ${user.name}. `);})
              .catch((err)=>{console.log(`Error while updating a final rating :: \n ${err}`);});

    return res.redirect('back');

}


// for rating we are accessing who is doing and to whom we doing. and manupulating their two data's on this click event.
module.exports.addRating = async function(req, res) {
    
    await User.findOne({email : req.params.id})
        .then((user)=>{

            let TARGET = req.body.targetID;

            console.log(`ID: {${TARGET}}`);

            User.findById(TARGET)
                    .then((tuser)=>{
                    
                        let oldlist = user.reviewlist;
                        let index = user.reviewlist.indexOf(TARGET);
                        let newlist = oldlist.splice(index, 1);
                        let userRated = tuser.userRated;
                        let Rating = tuser.rating;
                    
                        console.log("Rating : ", req.body.rate, typeof(req.body.rate));
                        console.log(userRated, "::", Rating, ".");
                        
                        if (!userRated){
                            userRated = 0;
                        }
                        if (!Rating){
                            Rating = 0;
                        }

                        console.log(userRated, "::", Rating, ".");
            
                        Rating =  (Number(Rating) * Number(userRated)) + Number(req.body.rate) ;
                        userRated ++ ;
                        Rating = Rating / userRated;
                        Rating = Rating.toFixed(3);
                        
                        console.log(userRated, "::", Rating, ".", oldlist);

                        User.findOneAndUpdate( {email : req.params.id}, { reviewlist : oldlist })
                            .then((newUser)=>{ console.log(`User updated with rating :: \n ${newUser}`) ; })
                            .catch((err)=>{ console.log(`Error while User rating updation :: \n ${err}`); });
                        
                        User.findByIdAndUpdate(TARGET, {
                                userRated : userRated,
                                rating : Rating,
                            })
                            .then((targetUpdated)=>{ console.log(`Target User update :: ${targetUpdated}`); })
                            .catch((err)=> { console.log(`Error while update a target user :: \n ${err}`) });

                    })
                    .catch((err)=>{console.log(`Tuser not found`)});           
        
        })
        .catch((err)=>{
            console.log(`Error modifying a user reviewlist :: \n ${err}`);
        })

    return res.redirect('back');

}

// 