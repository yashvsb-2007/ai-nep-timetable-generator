import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import apiRouter from './routes/api';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Optimization Middleware
app.use(helmet({
  contentSecurityPolicy: false // Allows rich dashboard widgets
}));
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'AI-Based Timetable Generation System API',
    nepAlignment: 'NEP 2020 Multidisciplinary Framework',
    status: 'ONLINE',
    version: '1.0.0'
  });
});

// Register API Router
app.use('/api', apiRouter);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` NEP 2020 AI Timetable Backend Server running on port ${PORT}`);
  console.log(` API Endpoint: http://localhost:${PORT}/api`);
  console.log(`=======================================================`);
});
