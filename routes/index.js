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
};
