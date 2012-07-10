var Mongolian = require('mongolian')
	, server = new Mongolian
	, db = server.db('nairezed')
	, characters = db.collection('characters');

// character(owner, name, attack, defense, health, exp, level)
var dbUtil = module.exports = {
	findCharacter: function(owner, callback) {
		characters.findOne({owner:owner}, callback);
	}
	, saveCharacter: function(character, callback) {
		characters.save(character, callback);
	}
};
