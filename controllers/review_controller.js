const User = require('./../models/user.js');



//  function to make a particular target employee to add into every other employee's review list except admin and that user.
module.exports.reviewHim = async function(req, res) {

    
    userid = req.params.id;
    console.log("entered", userid);
    
    await User.find({emptype : "Employee"})
        .then((userlist)=>{ 
            
            for (user of userlist){

                if (user.id == req.params.id) {
                
                    User.findByIdAndUpdate(req.params.id, {isreview : true})
                        .then((user)=>{ console.log("Updated User :: \n\n", user);})
                        .catch((err)=>{console.log(`Error updating a user for review :: ${err}`)});
                
                    continue;
                }

                User.findByIdAndUpdate(user.id, {
                    $push : {
                        reviewlist : req.params.id
                    }
                })
                    .then((user)=>{ console.log(`Added review list to ${user.id} using ${req.params.id}`) })
                    .catch((err)=>{ console.log(`Error during adding to review list in userID : ${user.name} :: \n ${err}`) });

            }

        })
        .catch((err)=>{
            console.log(`Error updating a user for review :: ${err}`);
        })

    return res.redirect('back');

}
