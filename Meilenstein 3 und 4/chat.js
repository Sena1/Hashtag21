
const socket = io();

socket.on('connect', () => {

var name;
function username() {
		name = $('#m').val();
		socket.emit('username', name);
		$('#m').val('');
		return false;
}

$('form').submit(() => {
	if(name !== undefined){
		socket.emit('chat message', {name: name, text: $('#m').val()});
		$('#m').val('');
		return false;
	} else{
		username();
		return false;
	}
});

socket.on('joined',(data) => {
	if(name !== undefined && data !== name){
		$('#messages').append($('<div>').text(data + " ist dem Chat beigetreten"));
	} else{
		return;
	}
});

socket.on('username',(data) => {
	$('#messages').append($('<div>').text("Willkommen " + data));
});

socket.on('chat message',(data) => {
	if(name !== undefined){
		$('#messages').append($('<div>').append(
			$('<b>').text(data.name + ': '),
			$('<span>').text(data.text))
		);
	} else {
		return;
	}
});

});
