var db = require('./db');

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
				db.newHero( hero, function(err, result) {
					if( err ) throw err;
					else{
						socket.emit('hero created');
						console.log('* created : new hero');
					}
				});
			});
			socket.on('update hero', function(hero) {
				db.findLevel( hero.exp, function(result) {
					var levelUp = result.level+1 - hero.level;
					if( levelUp > 0 ) {
						hero.bonus += levelUp;
						hero.level = result.level+1;
						hero.health = hero.maxhealth;
						socket.emit('hero levelup', hero);
					}
					console.log('* received update hero : ' + hero.health);
					db.updateHero( hero, function(err, result) {
						if( err ) throw err;
						else{
							socket.emit('hero updated', hero);
							console.log('* updated : hero '+hero.level);
						}
					});				
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

