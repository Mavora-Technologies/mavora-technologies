"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => async (req, res, next) => {
    try {
        req.body = await schema.parseAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
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
exports.validate = validate;
