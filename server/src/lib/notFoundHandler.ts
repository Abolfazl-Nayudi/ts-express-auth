import { Response, Request, NextFunction } from 'express';
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const url = req.url;
  res.status(404).json({ error: `the ${url} not found` });

  next();
};

export { notFoundHandler };
