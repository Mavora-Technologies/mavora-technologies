import { RequestHandler } from 'express';
import { ZodError, ZodObject } from 'zod';

export const validate = (schema: ZodObject<any>): RequestHandler => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body);
    next();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.error('❌ Zod Validation Failed:', JSON.stringify(error.issues, null, 2));
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.issues,
      });
    } else {
      console.error('❌ Generic Validation Error:', error);
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
};