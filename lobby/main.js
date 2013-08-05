var extensions = nodeRequire("engine/extensions.js");
extensions.onAssetsReady.listen(function() {
	var self = extensions.get("join");
	self.joinInput();
});

exports.joinInput = function() {
	var document = window.document;
	var input = document.createElement("input");
	input.setAttribute("id", "joinInput");
	var game = document.getElementById("game");
	game.appendChild(input);
	input.addEventListener("keydown", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			exports.join(input.value);
		}
	}, false);
};

function loadJS(src, callback) {
	var document = window.document;
	var s = document.createElement('script');
	s.src = src;
	s.async = true;
	s.onreadystatechange = s.onload = function() {
		var state = s.readyState;
		if (!callback.done && (!state || /loaded|complete/.test(state))) {
			callback.done = true;
			callback();
		}
	};
	document.getElementsByTagName('head')[0].appendChild(s);
}

exports.join = function(ip) {
	loadJS("http://" + ip + "/socket.io/socket.io.js", function() {
		exports.connect(ip);
	});
};

exports.connect = function(ip) {
	var socket = window.io.connect('http://' + ip);
	socket.on('news', function(data) {
		console.log(data);
		socket.emit('my other event', {
			my: 'data'
		});
	});
};