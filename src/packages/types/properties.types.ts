import { ObjectId } from 'mongoose';
import { ImageType, InstanceOfWithDates, WithId, WithIdAndTimestamps } from './common.types';

export type PropertySchema = {
    name: string;
    category: 'hotel' | 'hostel' | 'guest house' | 'house' | 'apartement';
    description: string;
    location: Location;
    accommodations: Accommodation[];
    facilities: Facilities;
    rating: number;
    numbOfReview: number;
    reviews: ReviewPropertySchema[];
    images: ImageType[];
    user: ObjectId;
}

type Location = {
    address: string;
    city: string;
    postcode: string;
}

type AccommodationSchema = {
    quantity: number;
    name: string;
    guests: number;
    price: number;
    beds: Beds;
    options: AccommodationOptions;
}

export type Accommodation = WithId<AccommodationSchema>


type AccommodationOptions = {
    airConditionned?: boolean;
    minibar?: boolean;
}

export type KeysOfAccomodationOptions = keyof AccommodationOptions;

type Beds =  {
    largeDoubleBed?: number;
    doubleBed?: number;
    simpleBed?: number;
    sofaBed?: number;
}

export type KeysOfBeds = keyof Beds;

interface Facilities {
    carPark: boolean;
    internet: boolean;
    breakfast: boolean;
    petsAllowed: boolean;
    roomCleaning: boolean;
}

export type KeysOfFacilities = keyof Facilities;

type ReviewPropertySchema = {
    user: ObjectId;
    name: string;
    rating: number;
    comment: string;
}

export type PropertyInstance = InstanceOfWithDates<PropertySchema>;

export type PropertyData = WithIdAndTimestamps<PropertySchema>

export type PropertyPreview = Pick<
    PropertyData,
    'id' | 'name' | 'category' | 'description' | 'location' | 'rating' | 'images' | 'numbOfReview'
> & { minPrice: number };

