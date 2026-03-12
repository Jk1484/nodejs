import { Router, Request, Response, NextFunction } from 'express';
import TodoService from '../services/todo.service';

const router = Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await TodoService.getAll();
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoService.getById(parseInt(req.params['id'] as string));
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoService.create(req.body.title);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoService.update(parseInt(req.params['id'] as string), req.body);
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await TodoService.remove(parseInt(req.params['id'] as string));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
