// Process db queries using mongolian module for mongodb.
// Main db name is 'nairezed', collection names are 'heroes'(data for each heroes), 'levelup'(requirement for levelup), 'monsters'(data for each monsters).
// 'db' module has user{username}, setUsername, newHero, updateHero, findHEro, findLevel, getMonsters
// Need to make easier to use this db.js for other apps. Is Mongolian easy enough for it?

var Mongolian = require('mongolian')
	, server = new Mongolian
	, db = server.db('nairezed')
	, heroes = db.collection('heroes')
	, levelup = db.collection('levelup')
	, monsters = db.collection('monsters')
	, SEC_HEALTH_RECOVERY = 60*5
	, RECOVERY_HEALTH_UNIT = 10;
	
var dbUtil = module.exports = {
	setUsername:function(username) {
		dbUtil.user = {username:username};
	}
	, newHero:function(hero, callback){
		heroes.insert(hero, callback);
	}
	, updateHero:function(hero, callback) {
		delete hero._id;
		heroes.update(dbUtil.user, { $set: hero}, callback);
	}
	, findHero:function(callback) {
		heroes.findOne(dbUtil.user, function(err, result) {
			if(err) throw err;
			else{
				// health recovery
				var hero = result;
				if( hero ) {
					hero.timeStamp = new Date().getTime();
					var timebonus = Math.floor((hero.timeStamp - hero.timeUpdated)/1000/SEC_HEALTH_RECOVERY);
					console.log('* timebonus = ' + timebonus);
					if( timebonus > 0 ) {
						hero.health += RECOVERY_HEALTH_UNIT * timebonus;
						if( hero.health > hero.maxHealth ) hero.health = hero.maxHealth;
						hero.timeUpdated = hero.timeStamp;
						dbUtil.updateHero(hero, function() {
							callback(err, hero);
						});
					}else{
						callback(err, result);
					}
				}else callback(err, result);
			}
		});
	}
	, findLevel:function(exp, callback) {
		levelup.find({'exp':{$lte:exp}}).sort({exp:-1}).limit(1).forEach(callback);
	}
	, getMonsters:function(level, callback) {
		var result = [];
		monsters.find({'fromLevel':{$lte:level}, 'toLevel':{$gte:level}}).forEach(function(monster) {
			result.push(monster);
		}, function(err) {
			if( err ) throw err;
			else callback(result);
		});
	}
};

