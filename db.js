var Mongolian = require('mongolian')
	, server = new Mongolian
	, db = server.db('nairezed')
	, heroes = db.collection('heroes')
	, levelup = db.collection('levelup')
	, monsters = db.collection('monsters');
	
var dbUtil = module.exports = {
	setUsername:function(username) {
		dbUtil.user = {username:username};
	}
	, newHero:function(hero, callback){
		heroes.insert(hero, callback);
	}
	, updateHero:function(hero, callback) {
		heroes.update(dbUtil.user, { $set: hero}, callback);
	}
	, hero:function(callback) {
		heroes.findOne(dbUtil.user, callback);
	}
	, findLevel:function(exp, callback) {
		levelup.find({'exp':{$lte:exp}}).sort({exp:-1}).limit(1).forEach(callback);
	}
	, getMonsters:function(level, callback) {
		var result = [];
		monsters.find({'fromlevel':{$lte:level}, 'tolevel':{$gte:level}}).forEach(function(monster) {
			result.push(monster);
		}, function(err) {
			if( err ) throw err;
			else callback(result);
		});
	}
};

