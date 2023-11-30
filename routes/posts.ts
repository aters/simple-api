import express from 'express';
import { getDB } from '../database';
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken } from '../authMiddleware';

const router = express.Router();
const db = getDB();

// GET /posts
router.get('/', async (req, res) => {
	const items = await db('posts').select('*');

	res.status(200).send(items);
});

// POST /posts
router.post('/', authenticateToken, async (req, res) => {
	const { title, content } = req.body;
	const result = await db('posts').insert({ id: uuidv4(), title, content }).returning('*');

	res.status(200).send(result[0]);
});

export default router;
