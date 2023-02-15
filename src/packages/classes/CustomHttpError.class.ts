import { isDevEnv } from '../constants';
import { ResStatus } from '../types';
import { CustomError } from './CustomError.class';


export class CustomHttpError {
    status: ResStatus.ERROR;
    message: string;
    error?: Error;
    stack?: string;

    constructor(err: Error | CustomError) {
        this.status = ResStatus.ERROR;
        if (isDevEnv || !(err instanceof Error)) {
            this.message = err.message;
        } else if (err.name === 'ValidatihandleHttpError') {
            this.message = 'Invalid request';
        } else {
            this.message = 'Internal server error';
        }
        // Dev infos
        if (isDevEnv && err instanceof Error) {
            this.error = err;
            this.stack = err.stack;
        }
    }
}


