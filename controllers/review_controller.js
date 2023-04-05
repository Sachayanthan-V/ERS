const User = require('./../models/user.js');

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


module.exports.check = async function(req, res){

    User.findById("642d14f8d75b8c3be3cb18b8")
        .then((user)=>{
            console.log(`User Found :: \n ${user}`);
        });

    return res.redirect('back');

}
