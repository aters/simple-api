import express from 'express';
import bcrypt from 'bcryptjs';
import { getDB } from '../database';

const router = express.Router();
const db = getDB();

// POST /users to create a new user
router.post('/', async (req, res) => {
	try {
		const { email, password, name } = req.body;
		if (!email || !password) {
			return res.status(400).send('email and password are required');
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await db('users')
			.insert({
				name,
				email,
				password: hashedPassword,
			})
			.returning('*');

		delete newUser[0].password;

		res.status(201).send(newUser[0]);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

export default router;
