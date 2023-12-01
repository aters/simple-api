import express from 'express';
import { getDB } from '../database';
import { authenticateToken } from '../authMiddleware';

const router = express.Router();
const db = getDB();

// POST /users to create a new user
router.post('/search-by-postcode', async (req, res) => {
	try {
		console.log(req.body);
		const items = await db('customers').select('*').where({ postcode: req.body.postcode });

		res.status(200).send(items);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// POST /users to create a new user
router.post('/search', authenticateToken, async (req, res) => {
	try {
		const items = await db('customers')
			.select(['firstname', 'lastname', 'balance'])
			.where({ email: req.body.email });

		const users = items.map((item) => {
			return {
				name: item.firstname + ' ' + item.lastname,
				balance: item.balance,
			};
		});

		res.status(200).send(users);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

export default router;
