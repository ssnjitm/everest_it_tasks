import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const SECRET = 'your-secret-key';

export const encryptPassword = (password: string) => 
  crypto.createHash('sha256').update(password).digest('hex');

export const generateToken = (payload: object) => 
  jwt.sign(payload, SECRET, { expiresIn: '24h' });