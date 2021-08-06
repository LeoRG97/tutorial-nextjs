import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { verify } from 'jsonwebtoken';
import { secret } from '../../../api/secret';

export const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  verify(req.cookies.auth!, secret, async function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: 'Sorry, you are not authenticated' });
    }
    return await fn(req, res);
  });
};

export default authenticated(async function getPeople(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({ filename: './mydb.sqlite', driver: sqlite3.Database });
  const people = await db.all('select id, name, email from Person');

  res.json(people);
});
