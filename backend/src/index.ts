import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { poolRoutes } from './routes/pools';
import { tokenRoutes } from './routes/tokens';
import { walletRoutes } from './routes/wallets';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pools', poolRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/wallets', walletRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 CMS API: http://localhost:8055`);
  console.log(`🌐 Frontend: http://localhost:3000`);
});
