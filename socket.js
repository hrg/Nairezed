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
				module.exports.newHero( hero, function(err, result) {
					if( err ) throw err;
					else{
						socket.emit('hero created');
						console.log('* created : new hero');
					}
				});
			});
			socket.on('update hero', function(hero) {
				module.exports.updateHero( hero, function(err, result) {
					if( err ) throw err;
					else{
						socket.emit('hero updated');
						console.log('* updated : hero');
					}
				});				
			});
			
		});
	}
	, setUsername:function(username) {
		module.exports.user = {username:username};
	}
	, newHero:function(hero, callback){
		db.insert('heroes', hero, callback);
	}
	, updateHero:function(hero, callback) {
		db.update('heroes', module.exports.user, hero, callback);
	}
	, hero:function(callback) {
		db.find('heroes', module.exports.user, callback);
	}
}

