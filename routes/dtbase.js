// database codes Dated : 28/07/2016
//Developed by Arijit Chatterjee */

var databaseUrl = "libraryDB2";

exports.insertUser = function(req, res){
	
  var collections = ["user"]
  var db = require("mongojs").connect(databaseUrl, collections);
 
  username = req.body.username;
  name=req.body.name;
  email = req.body.email;
  contact=req.body.contact;
   
  db.user.save({username: username,name:name,email: email, contact:contact}, function(err, callback) {
  if( err || !callback )
  	res.status(500).send(err);
  else
  	res.status(200).send('User Added successfully.............');
});

};


exports.insertBook = function(req, res){
	
    var collections = ["book"]
    var db = require("mongojs").connect(databaseUrl, collections);
  //res.writeHead(200, {'Content-Type': 'text/plain'});
  
  name=req.body.fullname;
  author=req.body.author;
  status=req.body.Status;
   
  db.book.save({name:name,author: author, status:status}, function(err, callback) {
  if( err || !callback )
  	res.status(500).send('Error occured during book insertion'); 
  else
  	res.status(200).send('Book added successfully.............');
});

};

exports.insertAdmin = function(req, res){
	
    var collections = ["adminUser"]
    var db = require("mongojs").connect(databaseUrl, collections);
  //res.writeHead(200, {'Content-Type': 'text/plain'});
  
  username = req.body.username;
  name=req.body.fullname;
  email = req.body.email;
  contact=req.body.contact;
  passwd = req.body.passwd;
   
  db.adminUser.save({username: username,name:name,email: email, contact:contact,password: passwd}, function(err, callback) {
  if( err || !callback )
  	res.status(500).send('Error occured during user insertion'); 
  else
  	res.status(200).send('Admin Added successfully.............');
});
   

};

exports.transaction = function(req, res){
	
    var collections = ["transaction"]
    var db = require("mongojs").connect(databaseUrl, collections);
  //res.writeHead(200, {'Content-Type': 'text/plain'});
  
  username = req.body.username;
  bookname=req.body.bookname;
  dueDate = req.body.dueDate;
  type=req.body.Type;
  
   console.log('Req body --------->'+JSON.stringify(req.body));
  db.transaction.save({username: username,bookname:bookname,dueDate: dueDate, type:type}, function(err, callback) {
  if( err || !callback )
  	res.status(500).send('Error occured during user insertion'); 
  else
  	transcatinStatus(req.body.Type,req.body.bookname,res);
});
   

};


exports.login = function(req, res){
	
    var collections = ["adminUser"]
    var db = require("mongojs").connect(databaseUrl, collections);
  	var bool =false;
	var uname=req.body.uname;
	var passwd=req.body.passwd;
	
	   db.adminUser.find({username:uname}, function(err, users) {
		 
		 if( err || !users) 
		 	res.status(400).send('No user found.Please check Credential.......');
		 else 
		 {
			  users.forEach( function(user) {
					if(user.username==uname && user.password==passwd)
					{
						bool=true;
                        res.status(200).send(bool);
					}
			});
			 //res.render('index',{msg:'User id or password matched'});
		  }
		  if(bool==false)
		  res.status(400).send('No user found.Please check Credential.......');
      }); 
    //console.log(uname+passwd);
};

exports.showallusers = function(req, res){
	
	var collections = ["user"]
  	var db = require("mongojs").connect(databaseUrl, collections);
    db.user.find('', function(err, users) {
		if( err) 
			res.status(400).send(err);
	  	else 
			{
				res.status(200).send(users);
	        }
  });
};

exports.showallbooks = function(req, res){
	
	var collections = ["book"];
  	var db = require("mongojs").connect(databaseUrl, collections);
    db.book.find('', function(err, books) {
		if( err) 
			res.status(400).send(err);
	  	else 
			{
				res.status(200).send(books);
	        }
  });
};


function transcatinStatus(tansType,bookname,res){

  console.log('Transaction Status---> '+tansType);
  console.log('Book name -----> '+bookname)
	var collections = ["book"];
    var db = require("mongojs").connect(databaseUrl, collections);
    var bStatus;
    if(tansType=="borrow")
    	bStatus='UnAvailable';
    else
    	bStatus='Available';
	   db.book.update({name:bookname},{$set:{status:bStatus}}, function(err, books) {
		 
		 if( err) 
		 	res.status(400).send(err);
		 else 
		 {
			res.status(200).send('Transaction Added successfully.............');
		 }
		  
      }); 
}



exports.removeBooks=function(req,res){
	
var bnm= req.query["bookid"];
var collections = ["book"];
var db = require("mongojs").connect(databaseUrl, collections);

db.book.remove({name:bnm}, function(err, delbook) {
		 if( err) 
		 res.status(500).send(err);
		 else 
		 {
			res.status(200).send('book removed ');
		 }
      }); 	
};