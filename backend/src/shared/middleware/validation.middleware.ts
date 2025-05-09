import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';

function validateDto(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const dtoInstance = Object.assign(new dtoClass(), req.body);

        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
             res.status(400).json({
                errors: errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints,
                }))
            });
        }else{
            next();
        }

    };
}

export default validateDto;