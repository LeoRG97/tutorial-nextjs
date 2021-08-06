import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { secret } from '../../../api/secret';
import cookie from 'cookie';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({ filename: './mydb.sqlite', driver: sqlite3.Database });

  if (req.method === 'POST') {
    const person = await db.get('select * from person where email = ?', [req.body.email]);
    if (!person) {
      res.status(401).json({ message: 'Email or password incorrect' });
    }
    //comparar las contraseñas cifradas
    compare(req.body.password, person.password, function (err, result) {
      if (err) {
        return res.status(401).json({ message: 'Email or password incorrect' });
      }

      const claims = { sub: person.id, myPersonEmail: person.email };
      const jwt = sign(claims, secret, { expiresIn: '1h' });

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('auth', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/',
        })
      );
      res.json({ message: 'Welcome back to the app!' });
    });
  } else {
    res.status(405).json({
      message: 'We only sopport POST',
    });
  }
}
