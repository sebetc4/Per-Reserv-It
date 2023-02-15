import { isObjectIdOrHexString, ObjectId } from 'mongoose';
import { NextApiRequest } from 'next';
import { ObjectSchema } from 'yup';
import { CustomError } from '../../../packages/classes';
import { isDevEnv } from '../../../packages/constants';


export const validQueryId = (req: NextApiRequest): ObjectId => {
    if (!isObjectIdOrHexString(req.query.id)) {
        throw isDevEnv ? CustomError.INVALID_QUERY_ID : CustomError.BAD_REQUEST;
    } else {
        return req.query.id as unknown as ObjectId;
    }
};

export const validBody = async <T>(schema: ObjectSchema<any>, req: NextApiRequest): Promise<T> => {
        await schema.validate(req.body);
        return req.body;
}