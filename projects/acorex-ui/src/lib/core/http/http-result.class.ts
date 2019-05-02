import { IHttpError } from './http-error.class';

export class HttpResult<T> {
    private _executor: (result: (e?: T) => void, error: (e?: IHttpError) => void, complete: () => void) => void;
    constructor(
        executor: (
            result: (e?: T) => void,
            error: (e?: IHttpError) => void,
            complete: () => void
        ) => void
    ) {
        this._executor = executor;
        setTimeout(() => {
            this._executor(this.resultAction, this.errorAction, this.completeAction);
        }, 50);
    }

    private resultAction: (e?: T) => void;
    private errorAction: (e?: IHttpError) => void;
    private completeAction: () => void;

    result(action: (e?: T) => void): HttpResult<T> { 
        this.resultAction = action;
        return this;
    }
    error(action: (e?: IHttpError) => void): HttpResult<T> {
        this.errorAction = action;
        return this;
    }
    complete(action: () => void): HttpResult<T> {
        this.completeAction = action;
        return this;
    }
}