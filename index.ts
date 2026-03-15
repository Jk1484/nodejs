import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './src/routes/todo.routes';
import { registry, httpRequestDuration, httpRequestTotal } from './src/metrics';

const app = express();
app.use(express.json());

// Metrics middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    const labels = { method: req.method, route: req.originalUrl.split('?')[0], status_code: res.statusCode };
    end(labels);
    httpRequestTotal.inc(labels);
  });
  next();
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', registry.contentType);
  res.send(await registry.metrics());
});
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
