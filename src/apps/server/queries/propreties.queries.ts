import { ObjectId } from 'mongoose';
import { NextApiRequest } from 'next';
import { CustomError } from '../../../packages/classes';
import { propertiesPerPage } from '../../../packages/constants';
import { PropertyInstance, PropertyPreview } from '../../../packages/types';
import { Property } from '../models/Property.model';

export const findAllPropertiesQuery = async (req: NextApiRequest) => {
    const allowedFilter: string[] = ['category', 'guests', 'accommodations.price'];

    const filters: any = req.query;
    const currentPage = Number(req.query.page) || 1;
    const location = req.query.location;

    const locationParams =
        typeof location === 'string' && location?.trim()
            ? {
                  $or: [
                      { 'location.city': { $regex: location, $options: 'i' } },
                      { 'location.address': { $regex: location, $options: 'i' } },
                      { 'location.postcode': { $regex: location, $options: 'i' } },
                  ],
              }
            : {};

    Object.keys(filters).forEach((key) => {
        if (!allowedFilter.includes(key)) {
            delete filters[key];
        }
        if (key === 'category' && filters[key] === 'all') {
            delete filters.category;
        }
        if (key === 'guests') {
            filters['accommodations.guests'] = Number(filters.guests);
            delete filters.guests;
        }
    });

    const options = { ...locationParams, ...filters };
    const propertiesCount = await Property.find(options).count();
    const projection: (keyof PropertyPreview | 'accommodations.price')[] = [
        'category',
        'name',
        'description',
        'location',
        'rating',
        'images',
        'numbOfReview',
        'accommodations.price',
    ];
    const properties: Partial<PropertyInstance[]> = await Property.find(
        { ...locationParams, ...filters },
        projection
    )
        .limit(propertiesPerPage)
        .skip(propertiesPerPage * (currentPage - 1));

    return {
        propertiesCount,
        properties,
    };
};

export const findPropertyByIdQuery = async (id: ObjectId) => {
    const property: PropertyInstance | null = await Property.findById(id);
    if (!property) {
        throw CustomError.NOT_FOUND;
    }
    return property;
};

export const updatePropertyQuery = async (id: ObjectId, data: {}) => {
    const updateProperty: PropertyInstance | null = await Property.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!updateProperty) {
        throw CustomError.NOT_FOUND;
    }
    return updateProperty;
};

export const deletePropertyQuery = async (id: ObjectId) => {
    const deletedProperty: PropertyInstance | null = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
        throw CustomError.NOT_FOUND;
    }
};
