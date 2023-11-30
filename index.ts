import express from 'express';
import { applyMiddlewares } from './middlewares';
import postsRouter from './routes/posts';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import { getDB } from './database';

const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// Apply all middlewares
applyMiddlewares(app);

app.get('/hello', (_req, res) => {
	res.status(200).send('Hello world');
});

// Posts
app.use('/posts', postsRouter);

// Users
app.use('/users', usersRouter); // use the users router

// Auth
app.use('/auth', authRouter); // use the users router

(async () => {
	try {
		console.log('Runnin migrations...');
		await getDB().migrate.latest();

		app.listen(port, () => console.log(`App listening on port ${port}!`));
	} catch (error) {
		console.error('Failed to run async tasks', error);
	}
})();
