import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function getAllVehiclesByPersonId(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({ filename: './mydb.sqlite', driver: sqlite3.Database });
  const vehicles = await db.all('select * from Vehicle where ownerId = ?', [req.query.id]);

  if (!vehicles) {
    res.status(400).json({ message: 'Not found' });
  }

  res.json(vehicles);
}
