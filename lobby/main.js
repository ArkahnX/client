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

exports.join = function(ip) {
	var document = window.document;
	var script = document.createElement("script");
	script.setAttribute("src", "http://" + ip + "/socket.io/socket.io.js");
	var body = document.body;
	body.appendChild(script);
	script.onload = function() {
		var socket = io.connect('http://'+ip);
		socket.on('news', function(data) {
			console.log(data);
			socket.emit('my other event', {
				my: 'data'
			});
		});
	};
};