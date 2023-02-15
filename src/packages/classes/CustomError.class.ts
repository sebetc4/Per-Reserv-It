export class CustomError {
    static readonly INVALID_QUERY_ID = new CustomError('The query ID is invalid', 400);
    static readonly BAD_REQUEST = new CustomError('Invalid request', 400);
    static readonly EMAIL_ALREADY_EXISTS = new CustomError('This email already exists', 400);
    static readonly EMAIL_ALREADY_EXISTS_OTHER_PROVIDER = new CustomError('This email already exists with other provider', 400);
    static readonly INVALID_RESET_PASSWORD_TOKEN = new CustomError('Invalid reset password token', 400);
    static readonly UNAUTHORIZED = new CustomError('Request requires user authentication', 401);
    static readonly WRONG_PASSWORD = new CustomError('Wrong password', 401);
    static readonly WRONG_EMAIL = new CustomError('Wrong email', 401);
    static readonly NOT_FOUND = new CustomError('The requested resource could not be found', 404);
    static readonly METHOD_NOT_ALLOWED = new CustomError('This method is not allowed', 405);
    static readonly INVALID_TOKEN = new CustomError('Invalid token', 498);
    static readonly INTERNAL_SERVER_ERROR = new CustomError('Internal server error', 500);
    private constructor(public readonly message: string, public readonly statusCode: number) {}
}