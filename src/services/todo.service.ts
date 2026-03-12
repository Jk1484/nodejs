import TodoRepository from '../repositories/todo.repository';
import { Todo } from '../types';

interface AppError {
  status: number;
  message: string;
}

const TodoService = {
  async getAll(): Promise<Todo[]> {
    return TodoRepository.findAll();
  },

  async getById(id: number): Promise<Todo> {
    const todo = await TodoRepository.findById(id);
    if (!todo) throw { status: 404, message: 'Todo not found' } as AppError;
    return todo;
  },

  async create(title: string): Promise<Todo> {
    if (!title || title.trim() === '') {
      throw { status: 400, message: 'Title is required' } as AppError;
    }
    return TodoRepository.create(title.trim());
  },

  async update(id: number, body: Partial<Pick<Todo, 'title' | 'done'>>): Promise<Todo> {
    const todo = await TodoRepository.findById(id);
    if (!todo) throw { status: 404, message: 'Todo not found' } as AppError;
    return TodoRepository.update(id, {
      title: body.title ?? todo.title,
      done: body.done ?? todo.done,
    });
  },

  async remove(id: number): Promise<void> {
    const deleted = await TodoRepository.remove(id);
    if (!deleted) throw { status: 404, message: 'Todo not found' } as AppError;
  },
};

export default TodoService;
