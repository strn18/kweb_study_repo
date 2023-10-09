// Code 3.3
const { Router } = require('express');

const router = Router();

// router.get('/', (req, res) => res.send('GET /'));
router.get('/', (req, res) => res.send('<h1>HI</h1>'));

// router.post('/', (req, res) => res.send('POST /'));

module.exports = router;