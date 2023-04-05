const User = require('../models/user');


module.exports.home = async function (req, res) {

	try {

		let emp = await User.find({emptype : "Employee"});
		let admins = await User.find({emptype : "Admin"});

		return res.render('home', {
			title : `Sachin's App`,  
			all_emp : emp, 
    		admins : admins,
		});

	}catch(err){
		console.log(`Error occured on HomeController ${err}`);
	}

};



module.exports.userHome = async function (req, res) {

	try {

		let emp = await User.find({emptype : "Employee"});
		let admins = await User.find({emptype : "Admin"});

		let emailID = res.locals.user.email;
		let reviewlist = await User.findOne( {email : emailID});

		let feedbackList = []
		let counter = 0;
		for ( loop of reviewlist.reviewlist ) {
			let user = await User.findById(loop);
			if (user.emptype=="Employee") {
				counter++ ;
			}

			let value = {
							targetid : loop, 
							name : user.name,
							email : user.email,
							emptype : user.emptype
						}

			feedbackList.push(value);

		}
		

		return res.render('home', {
			title : `Sachin's App`,  
			all_emp : emp, 
    		admins : admins,
			feedlist : feedbackList, 
			totalfeed :  counter
		});

	}catch(err){
		console.log(`Error occured on HomeController ${err}`);
	}

};
