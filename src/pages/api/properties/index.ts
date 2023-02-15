// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../apps/server/config';
import { createProperty, getAllProperties } from '../../../apps/server/controllers';
import { onError } from '../../../apps/server/utils';
import { CustomError } from '../../../packages/classes';
import { ReqMethods } from '../../../packages/types';


export default async function propertiesRouter (req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    switch (req.method) {
        case ReqMethods.GET:
            await getAllProperties(req, res);
            break
        case ReqMethods.POST:
            await createProperty(req, res)
            break
        default:
            onError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}
