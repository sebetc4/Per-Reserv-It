import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../../apps/server/config';
import { forgotPassword } from '../../../../apps/server/controllers';
import { onError } from '../../../../apps/server/utils';
import { CustomError } from '../../../../packages/classes';
import { ReqMethods } from '../../../../packages/types';



export default async function forgotPasswordHandler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    switch (req.method) {
        case ReqMethods.POST:
            await forgotPassword(req, res)
            break
        default:
            onError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}