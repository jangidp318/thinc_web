import express from 'express';
import cors from 'cors';

require('dotenv').config();
const connectDB = require('./config/db');
const contentRoutes = require('./routes/content.routes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/content', contentRoutes);

module.exports = app;
