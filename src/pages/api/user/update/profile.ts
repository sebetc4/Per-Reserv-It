import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../../apps/server/config';
import { updateProfile } from '../../../../apps/server/controllers';
import { onError } from '../../../../apps/server/utils';
import { CustomError } from '../../../../packages/classes';
import { ReqMethods } from '../../../../packages/types';

export default async function updateUserProfileHandler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    switch (req.method) {
        case ReqMethods.PUT:
            await updateProfile(req, res)
            break
        default:
            onError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
}