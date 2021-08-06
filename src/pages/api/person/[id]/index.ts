import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function getPersonById(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({ filename: './mydb.sqlite', driver: sqlite3.Database });

  if (req.method === 'PUT') {
    let data = [req.body.name, req.body.email, req.query.id];
    let sql = 'UPDATE person SET name = ?, email = ? where id = ?';

    db.run(sql, data, (err: any) => {
      if (err) {
        return res.status(400).json({ message: 'Update operation failed' });
      }
    });
  }

  const person = await db.get('select id, name, email from Person where id = ?', [req.query.id]);
  if (!person) {
    res.status(400).json({ message: 'Not found' });
  }
  res.json(person);
}
