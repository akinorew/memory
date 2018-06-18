const Hapi = require('hapi');
const Score = require('./../models/score');
const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/memory').catch((e) => {
	console.log(e); throw e;
});

const db = Mongoose.connection;

db.on('error', () => {
	console.error.bind(console, 'connection error');
});
db.once('open', () => {
	// Score.remove((error) => {
	// 	if (error) {
	// 		throw error;
	// 	} else {
	// 		console.log('No scores deleted!');
	// 	}
	console.log('Connection with database succeeded.');
});

// Create a server with a host and port
const server = new Hapi.Server({
	debug: { request: ['error'] },
	host: 'localhost',
	port: 8000,
});

// Add the route
server.route({
	method: 'GET',
	path: '/scores',
	options: {
		cors: {
			origin: ['*'],
		},
	},
	handler: () => {
		// const response = reply.response({
		// 	status: 'hello',
		// });

		// response.type('text/html');
		// response.header('Access-Control-Request-Headers', 'access-control-allow-origin');
		// response.header('Access-Control-Request-Method', 'GET');

		// return response;

		const response = new Promise((resolve, reject) => {
			Score.find().lean().exec((error, scores) => {
				if (error) {
					reject(error);
				}

				resolve(JSON.stringify(scores));
			});
		});

		return response;
	},
});

server.route({
	method: 'POST',
	path: '/save',
	options: {
		cors: {
			origin: ['*'],
		},
	},
	handler: (request) => {
		const promise = new Promise((resolve) => {
			const payload = JSON.parse(request.payload);

			new Score({
				name: payload.name,
				score: payload.score,
			}).save().then((res) => {
				resolve(res);
			});
		});

		return promise;
	},
});

server
	.start()
	.then(() => {
		console.log('Server running at:', server.info.uri);
	})
	.catch(err => console.log(err));
