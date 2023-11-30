import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDB } from '../database';

const router = express.Router();
const db = getDB();

router.post('/login', async (req, res) => {
	const user = await db('users').select(['email', 'password']).where({ email: req.body.email }).first();

	if (user == null) {
		return res.status(400).send('Cannot find user');
	}

	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const accessToken = jwt.sign({ email: user.email, name: user.name }, process.env.ACCESS_TOKEN_SECRET);
			res.json({ accessToken: accessToken });
		} else {
			res.send('Not Allowed');
		}
	} catch {
		res.status(500).send();
	}
});

export default router;
