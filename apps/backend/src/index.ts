import express from 'express';
import { prisma } from './db';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({
      status: 'ok',
      database: 'connected',
      userCount,
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      message: (error as Error).message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});