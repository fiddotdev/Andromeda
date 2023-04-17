import { Request, Response, NextFunction } from 'express';

function requireFields<T>(fields: (keyof T)[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestBody = req.body as Partial<T>;

    const missingFields: (keyof T)[] = fields.filter(
      (field) =>
        !Object.prototype.hasOwnProperty.call(requestBody, field) ||
        requestBody[field] === undefined
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: `Please provide ${missingFields.join(', ')}`,
      });
    }

    next();
  };
}

export default requireFields;
