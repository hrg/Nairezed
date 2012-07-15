var Mongolian = require('mongolian')
	, server = new Mongolian
	, db = server.db('nairezed');

// hero(username, name, attack, defense, health, exp, level)
var dbUtil = module.exports = {
	find: function(table, data, callback) {
		db.collection(table).findOne(data, callback);
	}
	, insert: function(table, data, callback) {
		db.collection(table).insert(data, callback);
	}
	, update: function(table, query, data, callback) {
		db.collection(table).update(query, { $set: data}, callback);
	}
};
