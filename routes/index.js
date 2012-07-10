var repo = require('../repository');
/*
 * GET home page.
 */
var gameName = 'Nairezed';

module.exports = {
	index : function(req, res){
	  res.render('index', { title: gameName })
  }
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
				res.render('character', {title: gameName +' : My Character'
				, myCharacter:c});
	 		});
	 	}else{
	  	res.render('index', { title: 'Welcome to ' + gameName })
	 	}
  }
  , newChar: function(req, res) {
  	req.body.owner = req.session.owner;
		repo.saveCharacter( req.body, function(err, result) {
			if( err ) throw err;
			else{
				req.session.myCharacter = c;
				res.render('character', {title: gameName +' : My Character'
				, myCharacter:req.body});
			}
		});
  }
  , main: function(req, res) {
  	res.render('main', {title: gameName +' : Main', 
  		myCharacter:req.session.myCharacter});
  }
};
