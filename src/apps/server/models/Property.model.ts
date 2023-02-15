import mongoose, { Schema, model, models } from 'mongoose';
import { PropertySchema } from '../../../packages/types';

const PropertySchema = new Schema<PropertySchema>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxLength: 100,
        },
        category: {
            type: String,
            required: true,
            enum: {
                values: ['hotel', 'hostel', 'guest house', 'house', 'apartement'],
            },
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxLength: 500,
        },
        location: {
            address: {
                type: String,
                required: true,
                trim: true,
            },
            city: {
                type: String,
                required: true,
                trim: true,
            },
            postcode: {
                type: String,
                required: true,
            },
        },
        accommodations: [
            {
                quantity: {
                    type: Number,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                    max: 9999,
                    default: 0.0,
                },
                guests: {
                    type: Number,
                    required: true,
                },
                beds: {
                    largeDoubleBed: {
                        type: Number,
                        default: 0,
                    },
                    doubleBed: {
                        type: Number,
                        default: 0,
                    },
                    simpleBed: {
                        type: Number,
                        default: 0,
                    },
                    sofaBed: {
                        type: Number,
                        default: 0,
                    },
                },
                options: {
                    airConditionned: {
                        type: Boolean,
                        default: false,
                    },
                    minibar: {
                        type: Boolean,
                        default: false,
                    }
                }
            },
        ],
        facilities: {
            carPark: {
                type: Boolean,
                default: false,
            },
            internet: {
                type: Boolean,
                default: false,
            },
            breakfast: {
                type: Boolean,
                default: false,
            },
            petsAllowed: {
                type: Boolean,
                default: false,
            },
            roomCleaning: {
                type: Boolean,
                default: false,
            },
        },
        rating: {
            type: Number,
            default: 0,
        },
        numbOfReview: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                user: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                    required: false,
                },
                name: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                },
                comment: {
                    type: String,
                    required: true,
                },
            },
        ],
        images: [
            {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Property = models.Property || model<PropertySchema>('Property', PropertySchema);
