var db = require('./db');

var HERO_HEALTH_DIE = 1
	, LEVELUP_BONUS_UNIT = 2;

module.exports = {
	listen:function(app) {
		var io = require('socket.io').listen(app);
	
		io.configure(function() {
			io.set('log level', 2);
			io.set('transports', [
				'websocket'
				, 'flashsocket'
				, 'htmlfile'
				,	'xhr-polling'
				, 'jsonp-polling'
			]);
		});
		var socket = io.on('connection', function(socket) {
			console.log('* socket connected');
			socket.on('new hero', function(hero) {
				hero.timeCreated = hero.timeUpdated = hero.timeStamp = new Date().getTime();
				db.newHero( hero, function(err, result) {
					if( err ) throw err;
					else{
						socket.emit('hero created');
						console.log('* created : new hero');
					}
				});
			});
			socket.on('get hero', function() {
				db.findHero( function(err, result) {
		 			if(err) throw err;
		 			else{
		 				socket.emit('hero info', result);
		 			}
		 		});
			});
			socket.on('update hero', function(hero) {
				db.findLevel( hero.exp, function(result) {
					var levelUp = result.level+1 - hero.level;
					if( levelUp > 0 ) {
						hero.bonus += levelUp*LEVELUP_BONUS_UNIT;
						hero.level = result.level+1;
						hero.health = hero.maxHealth;
						socket.emit('hero levelup', hero);
					}
					console.log('* received update hero : hero.health = ' + hero.health);
					db.updateHero( hero, function(err, result) {
						if( err ) throw err;
						else{
							socket.emit('hero updated', hero);
							console.log('* updated : hero.level = '+hero.level);
						}
					});				
				});			
			});
			socket.on('die hero', function(hero) {
				console.log('* received die hero : ' + hero.health);
				hero.health = HERO_HEALTH_DIE;
				db.updateHero( hero, function(err, result) {
					if( err ) throw err;
					else{
						socket.emit('hero updated', hero);
						console.log('* updated : hero.health = '+hero.health);
					}
				});		
			});
			socket.on('get monsters', function(level) {
				db.getMonsters(level, function(monsters) {
					socket.emit('monsters', monsters);
				});
			});
		});
	}
}

