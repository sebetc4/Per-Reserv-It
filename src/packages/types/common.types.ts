import { HydratedDocument, SchemaTimestampsConfig } from "mongoose";

/**
/ Models
*/
export type ImageType = {
    public_id: string;
    url: string;
}

export type WithId<T> = T & {
    id: string;
}

export type WithIdAndTimestamps<T> = WithId<T> & {
    createdAt: string;
    updatedAt: string;
}

export type InstanceOf<T> = HydratedDocument<T>

export type InstanceOfWithDates<T> = InstanceOf<T> & SchemaTimestampsConfig

/**
 * Naviguation
 */

export enum Path {
    HOME = "/",
    LOGIN = "/login",
    SIGNUP = "/signup",
    FORGOT_PASSWORD = "/password/forgot",
    PROPERTY = "/property",

}
