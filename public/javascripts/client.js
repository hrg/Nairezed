window.clientjs = {
	ajax: function(url ,data ,callback) {
		if(data.tagName == "FORM") data = clientjs.serialize(data);
		$.post(url, data, function(data, textStatus, jqXHR) { callback(data) })
		.error(function(){ alert('error at ' + url) } );
	}
	, serialize: function(o) {
		return $(o).serialize();
	}
}

