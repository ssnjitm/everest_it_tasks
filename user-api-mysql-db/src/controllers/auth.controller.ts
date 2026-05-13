import type { Request, Response } from 'express';
import * as UserService from '../services/user.service.js';
import User from '../models/user.model.js';

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    const token = UserService.createToken(user.id!, user.username);
    
    res.status(201).json({ success: true, token });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};