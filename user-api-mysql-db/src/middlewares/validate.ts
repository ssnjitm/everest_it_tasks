import Ajv from 'ajv';
import { Request, Response, NextFunction } from 'express';

const ajv = new Ajv();

const schema = {
  type: 'object',
  required: ['username', 'email', 'password'],
  properties: {
    username: { type: 'string', minLength: 3 },
    email: { type: 'string', pattern: '^\\S+@\\S+\\.\\S+$' },
    password: { type: 'string', minLength: 6 }
  }
};

const validate = ajv.compile(schema);

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
//   const isValid = validate(req.body);
//   if (!isValid) {
//     return res.status(400).json({ error: 'Invalid input', details: validate.errors });
//   }
  next();
};