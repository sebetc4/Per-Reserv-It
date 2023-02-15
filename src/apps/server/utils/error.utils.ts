import { NextApiRequest, NextApiResponse } from "next";
import { CustomError, CustomHttpError } from "../../../packages/classes";

export const catchError = (func: (req: NextApiRequest, res: NextApiResponse) => void) => { 
    return (req: NextApiRequest, res: NextApiResponse) =>
        Promise.resolve(func(req, res)).catch((err) => onError(err, res));
}

export const onError = (err: Error | CustomError, res: NextApiResponse) => {
    const error = new CustomHttpError(err);
    let statusCode: number
    if (!(err instanceof Error)) {
        statusCode = err.statusCode;
    } else if (err.name === 'ValidationError'){
        statusCode = 400
    } else {
        statusCode = 500
    }
    res.status(statusCode).json(error);
}