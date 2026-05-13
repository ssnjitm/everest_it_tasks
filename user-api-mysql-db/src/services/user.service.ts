import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'super-secret';

export const createToken = (userId: number, username: string) => {
  return jwt.sign({ userId, username }, SECRET, { expiresIn: '24h' });
};

export const findUserByUsername = async (username: string) => {
  return await User.findOne({ where: { username } });
};