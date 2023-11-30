const request = require('supertest');
const express = require('express');

const app = express();

app.get('/hello', (_req, res) => {
    res.status(200).send('Hello world');
});

describe('GET /hello', () => {
    it('responds with Hello world', async () => {
        const response = await request(app).get('/hello');
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual('Hello world');
    });
});
