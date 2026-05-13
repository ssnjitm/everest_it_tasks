import { Request, Response } from 'express';
import User from '../models/user.model.js';
import * as AuthService from '../services/auth.service.js';

export const signup = async (req: Request, res: Response) => {
  try {
    const { password, ...rest } = req.body;
    const user = await User.create({ 
      ...rest, 
      password: AuthService.encryptPassword(password) 
    });
    const token = AuthService.generateToken({ userId: user.id, username: user.username, role: user.role });
    res.status(201).json({ success: true, token });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    const encrypted = AuthService.encryptPassword(password);

    if (!user || user.password !== encrypted) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = AuthService.generateToken({ userId: user.id, username: user.username, role: user.role });
    res.json({ success: true, token });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const user = await User.findByPk((req as any).user.userId, { attributes: { exclude: ['password'] } });
  res.json({ success: true, data: user });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json({ success: true, data: users });
};

export const updateUser = async (req: Request, res: Response) => {
  await User.update(req.body, { where: { id: req.params.userId } });
  res.json({ success: true, message: 'User updated' });
};

export const deleteUser = async (req: Request, res: Response) => {
  await User.destroy({ where: { id: req.params.userId } });
  res.json({ success: true, message: 'User deleted' });
};