var Mongolian = require('mongolian')
	, server = new Mongolian
	, db = server.db('nairezed')
	, heros = db.collection('heros');

// hero(username, name, attack, defense, health, exp, level)
var dbUtil = module.exports = {
	findHero: function(username, callback) {
		heros.findOne({username:username}, callback);
	}
	, saveHero: function(hero, callback) {
		heros.save(hero, callback);
	}
};
