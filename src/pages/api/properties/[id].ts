import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../apps/server/config';
import { deleteProprety, getOneProperty, updateProperty } from '../../../apps/server/controllers';
import { onError } from '../../../apps/server/utils';
import { CustomError } from '../../../packages/classes';
import { ReqMethods } from '../../../packages/types';


export default async function propertyRouter (req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.GET:
            await getOneProperty(req, res);
            break;
        case ReqMethods.PUT:
            await updateProperty(req, res);
            break;
        case ReqMethods.DELETE:
            await deleteProprety(req, res);
            break;
        default:
            onError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}
