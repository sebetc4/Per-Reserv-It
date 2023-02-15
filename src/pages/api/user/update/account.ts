import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../../apps/server/config';
import { updateAccount } from '../../../../apps/server/controllers';
import { onError } from '../../../../apps/server/utils';
import { CustomError } from '../../../../packages/classes';
import { ReqMethods } from '../../../../packages/types';

export default async function updateUserAccountPassword(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    switch (req.method) {
        case ReqMethods.PUT:
            await updateAccount(req, res)
            break
        default:
            onError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}