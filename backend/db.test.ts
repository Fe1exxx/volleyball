import { describe, it, expect } from 'vitest';
import pool from './src/routes/db.ts';

describe('Database connection', () => {
  it('should connect to database', async () => {
    const result = await pool.query('SELECT NOW()');
    expect(result.rows).toHaveLength(1);
    console.log('DB connected:', result.rows[0].now);
  });
});