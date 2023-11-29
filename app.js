const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
	res.header('Content-Type', 'application/json');
	next();
});
app.use(bodyParser.json());

app.use(
	'/posts',
	(req, res, next) => {
		console.log('Request URL:', req.originalUrl);
		next();
	},
	(req, res, next) => {
		console.log('Request Type:', req.method);
		console.log('Request body', JSON.stringify(req.body));
		next();
	}
);



app.get('/test', (_req, res) => {
	res.status(200).send('Hello world');
});

app.get('/posts', (req, res) => {
	res.status(200).send(JSON.stringify({ title: 'test-title', content: 'test-content' }));
});
app.post('/posts', (req, res) => {
	res.status(200).send(JSON.stringify({ title: 'test-title', content: 'test-content' }));
});

module.exports = app;
