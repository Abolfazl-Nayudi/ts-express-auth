import joi from 'joi';
import { Response, Request, NextFunction } from 'express';
export class ValidationMiddleware {
  static registerUser(req: Request, res: Response, next: NextFunction) {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(5).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }

    next();
  }
}
