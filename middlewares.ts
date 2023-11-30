import express from 'express';

export function applyMiddlewares(app: express.Express) {
	app.use(express.json());

	app.use((req, res, next) => {
		res.header('Content-Type', 'application/json');
		next();
	});

	app.use(
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
}
