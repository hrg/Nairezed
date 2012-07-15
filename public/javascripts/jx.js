window.jx = {
	ajax: function(url ,data ,callback) {
		if(data.tagName == "FORM") data = jx.serialize(data);
		$.post(url, data, function(data, textStatus, jqXHR) { callback(data) })
		.error(function(){ alert('error at ' + url) } );
	}
	, serialize: function(o) {
		return $(o).serialize();
	}
	, id: function(str){
		return document.getElementById(str);
	}
	, on: function(str, event, callback) {
		jx.id(str).addEventListener(event,callback);
	}
	, ready: function(callback) {
		$(document).ready(callback);
	}
}

