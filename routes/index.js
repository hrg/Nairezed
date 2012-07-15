var socket = require('../socket')

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
	  	socket.setUsername(username);
  		if( req.session.username != username ) {
	  		req.session.username = username;
	  	}
	 		socket.hero( function(err, result) {
	 			if(err) throw err;
	 			else{
	 				hero = result;
	 			}
	 			req.session.hero = hero;
		  	res.render('main', {title: gameTitle +' : Main', hero:hero, username:username});
	 		});
	 	}else{
	  	res.render('index', { title: gameTitle })
	 	}
  }
};
