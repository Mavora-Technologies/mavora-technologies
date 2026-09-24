import { ZodError } from 'zod';
export const validate = (schema) => async (req, res, next) => {
    try {
        req.body = await schema.parseAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            console.error('❌ Zod Validation Failed:', JSON.stringify(error.issues, null, 2));
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.issues,
            });
        }
        else {
            console.error('❌ Generic Validation Error:', error);
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
};
