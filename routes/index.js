var repo = require('../repository');
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
  		if( req.session.username != username ) req.session.username = username;
	 		repo.findHero( username , function(err, result) {
	 			if(err) throw err;
	 			else{
	 				hero = result;
	 			}
	 			req.session.hero = hero;
		  	res.render('main', {title: gameTitle +' : Main', hero:hero});
	 		});
	 	}else{
	  	res.render('index', { title: gameTitle })
	 	}
  }
  , newHero: function(req, res) {
  	req.body.username = req.session.username;
		repo.saveHero( req.body, function(err, result) {
			if( err ) throw err;
			else{
				res.render('data', {layout:false, data:JSON.stringify(req.body)});
			}
		});
  }
  /*
  , character : function(req, res) {
  	var c, owner = req.body.owner;
  	if( owner && owner.trim() !== '' ) {
  		req.session.owner = owner;
	 		repo.findCharacter( owner , function(err, result) {
	 			if(err) throw err;
	 			else{
	 				c = result;
	 			}
	 			req.session.myCharacter = c;
				res.render('character', {title: gameTitle +' : My Character'
				, myCharacter:c});
	 		});
	 	}else{
	  	res.render('index', { title: 'Welcome to ' + gameTitle })
	 	}
  }
  , newChar: function(req, res) {
  	req.body.owner = req.session.owner;
		repo.saveCharacter( req.body, function(err, result) {
			if( err ) throw err;
			else{
				req.session.myCharacter = c;
				res.render('character', {title: gameTitle +' : My Character'
				, myCharacter:req.body});
			}
		});
  }
		*/

};
