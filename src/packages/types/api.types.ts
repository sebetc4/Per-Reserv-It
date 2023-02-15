export enum ReqMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
export enum SessionStatus {
    VALID = 'VALID',
    INVALID = 'INVALID'
}

export enum ResStatus {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface ICustomHttpError {
    message: string;
    status: ResStatus.ERROR;
    error?: Error;
    stack?: string;    
}


