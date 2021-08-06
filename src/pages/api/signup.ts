import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { hash } from 'bcrypt';

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({ filename: './mydb.sqlite', driver: sqlite3.Database });

  if (req.method === 'POST') {
    // let sql = 'INSERT INTO person (name, email, password) values (?,?,?)';
    hash(req.body.password, 10, async function (err, hash) {
      // Store hash in your password DB.

      const statement = await db.prepare('INSERT INTO person (name, email, password) values (?,?,?)');
      const result = statement.run(req.body.name, req.body.email, hash);
      result.finally();

      const person = await db.all('select * from Person');
      res.json(person);
    });
  } else {
    res.status(405).json({
      message: 'We only sopport POST, idiot!',
    });
  }
}
