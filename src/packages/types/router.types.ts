import { HydratedDocument, SchemaTimestampsConfig } from "mongoose";

/**
 * Navigation
 */
export enum Path {
    HOME = "/",
    LOGIN = "/login",
    SIGNUP = "/signup",
    FORGOT_PASSWORD = "/password/forgot",
    RESET_PASSWORD = "/password/reset",
    PROPERTY = "/property",
}

export enum QueryParams {
    // Login
    INVALID_TOKEN = 'invalidToken',
    EMAIL_ALREADY_EXISTS_WITH_DIFFERENT_PROVIDER = 'emailAlreadyExistsWithDifferentProvider',
    RESET_PASSWORD_SUCCESS = 'resetPasswordSuccess'
}
