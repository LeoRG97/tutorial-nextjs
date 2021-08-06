import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function getVehicleById(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({ filename: './mydb.sqlite', driver: sqlite3.Database });
  const vehicle = await db.get('select * from Vehicle where id = ?', [req.query.id]);
  if (!vehicle) {
    res.status(400).json({ message: 'Not found' });
  }
  res.json(vehicle);
}
