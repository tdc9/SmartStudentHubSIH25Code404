// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// 👇 Test route
app.get('/', (req, res) => {
  res.json({ message: 'Smart Student Hub backend running 🚀' });
});

// routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);
const achievementRoutes = require('./routes/achievement.routes');
app.use('/api/achievements', achievementRoutes);

module.exports = app;
