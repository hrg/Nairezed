// handle get/post requests from http://domain/ and http://domain/main
// index : render game title page(facebook login)
// main : find a hero which a user with username have. In this case, find the hero in DB using db.js powered by mongodb.

//var socket = require('../socket');
var db = require('../db');

/*
 * GET home page.
 */
var gameTitle = 'Nairezed';

module.exports = {
	index : function(req, res){
	  res.render('index', { title: gameTitle })
  }
  , main: function(req, res) {
  	var hero, username;
  	if( req.body.username ) username = req.body.username; // receive post data
  	else username = req.session.username;
  	if( username && username.trim() !== '' ) {
	  	db.setUsername(username);
  		if( req.session.username != username ) {
	  		req.session.username = username;
	  	}
	 		db.findHero( function(err, result) {
	 			if(err) throw err;
	 			else{
	 				hero = result;
	 			}
	 			req.session.hero = hero;
		  	res.render('main', {title: gameTitle +' : Main', hero:hero, username:username, timeStamp:new Date().getTime()});
	 		});
	 	}else{
	  	res.render('index', { title: gameTitle })
	 	}
  }
};
