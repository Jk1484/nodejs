import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './src/routes/todo.routes';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/todos', todoRoutes);

// Global error handler
app.use((err: { status?: number; message?: string }, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({ error: err.message || 'Internal server error' });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
