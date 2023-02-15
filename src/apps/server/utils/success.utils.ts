import type { NextApiResponse } from 'next';
import { ResStatus } from '../../../packages/types';

export const onSuccess = (data: {}, statusCode: number, res: NextApiResponse) => {
    res.status(statusCode).json({
        status: ResStatus.SUCCESS,
        ...data,
    });
};
