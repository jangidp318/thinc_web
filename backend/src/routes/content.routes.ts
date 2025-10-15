import express from 'express';

const router = express.Router();
const contentController = require('../controllers/content.controller');

router.get('/', contentController.getAllContent);

module.exports = router;
