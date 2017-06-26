const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const _ = require('underscore');
const bodyParser = require('body-parser');
const cors = require('cors');
const serveStatic = require('serve-static');
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(cors());
app.use('/view', express.static(__dirname + '/view'));
app.use('/design', express.static(__dirname + '/design'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/javascript', express.static(__dirname + '/javascript'));

let playersAll = require('./data/players.json');

app.get('/api/players', (req, res) => {
	let search = req.query.search || 'false';
	let query = req.query.favorites || 'false';

	if(query === 'true'){
		res.status(200).json(_.where(playersAll, {favorit: true}));
	} else if (search !== 'false') {
		res.status(200).json(_.filter(playersAll,function(e){
			return e.name.charAt(0) === search;}));
	}else if(query === 'false'){
		res.status(200).json(playersAll);
	} else {
		res.status(404).json({message: 'FAIL' });
	}
});

app.delete('/api/players/:id', (req,res) =>  {
	if(_.find(playersAll, {_id: req.params.id}) !== undefined){
		let filtered = _.filter(playersAll, (e) => {
			return !(e._id === req.params.id);
		});
		playersAll = filtered;
		res.status(200).json(playersAll);
	} else{
		res.status(404).json('Der genannte Spieler existiert nicht');
	}
});

app.post('/api/players', (req,res) => {

	if(req.body){
		res.status(200).json({ message: 'Spieler wurde erfolgreich gespeichert' });
	} else{
		res.status(404).json({ message: 'Empty body is not allowed.' });
	}
});

app.put('/api/players/:id', (req,res) => {
	res.status(200).json({message: 'Spieler mit der ID '+ req.params.id + ' wurde erfolgreich geupdatet'});
})

//CHAT
io.on('connection', (socket) => {
	socket.on('username', (name) => {
		// An diesen Nutzer Willkommensnachricht senden
		socket.emit('username', name);
		// Alle Nutzer Bescheid geben, dass jemand beigetreten ist
		io.emit('joined', name);
	});

	socket.on('chat message', (msg) => {
		// An alle Nutzer die Nachricht senden
		io.emit('chat message', {name: msg.name || 'Anonym', text: msg.text});
	});
});

http.listen(3000, function() {
	console.log('Server listening on http://localhost:3000');
});
