import type { NextApiRequest, NextApiResponse } from 'next';
import { PropertyInstance } from '../../../packages/types';

import { Property } from '../models';
import {
    deletePropertyQuery,
    findAllPropertiesQuery,
    findPropertyByIdQuery,
    updatePropertyQuery,
} from '../queries/propreties.queries';
import { catchError, validQueryId, onSuccess } from '../utils';

export const createProperty = catchError(async (req, res) => {
    const createdProperty: PropertyInstance = await Property.create(req.body);
    onSuccess({ createdProperty }, 201, res);
});

export const getOneProperty = catchError(async (req, res) => {
    const id = validQueryId(req);
    const property: PropertyInstance = await findPropertyByIdQuery(id);
    onSuccess({ property }, 200, res);
});

export const getAllProperties = catchError(async (req, res) => {
    const data = await findAllPropertiesQuery(req);
    onSuccess({ ...data }, 200, res);
});

export const updateProperty = catchError(async (req, res) => {
    const id = validQueryId(req);
    const updatedProperty: PropertyInstance = await updatePropertyQuery(id, req.body);
    onSuccess({ updatedProperty }, 200, res);
});

export const deleteProprety = catchError(async (req, res) => {
    const id = validQueryId(req);
    await deletePropertyQuery(id);
    onSuccess({ message: 'Property is deleted' }, 200, res);
});
