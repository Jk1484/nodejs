import db from '../db';
import { Todo } from '../types';

const TodoRepository = {
  async findAll(): Promise<Todo[]> {
    const result = await db.query<Todo>('SELECT * FROM todos ORDER BY id');
    return result.rows;
  },

  async findById(id: number): Promise<Todo | undefined> {
    const result = await db.query<Todo>('SELECT * FROM todos WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(title: string): Promise<Todo> {
    const result = await db.query<Todo>(
      'INSERT INTO todos (title, done) VALUES ($1, false) RETURNING *',
      [title]
    );
    return result.rows[0];
  },

  async update(id: number, fields: Partial<Pick<Todo, 'title' | 'done'>>): Promise<Todo> {
    const result = await db.query<Todo>(
      'UPDATE todos SET title = $1, done = $2 WHERE id = $3 RETURNING *',
      [fields.title, fields.done, id]
    );
    return result.rows[0];
  },

  async remove(id: number): Promise<boolean> {
    const result = await db.query('DELETE FROM todos WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  },
};

export default TodoRepository;
