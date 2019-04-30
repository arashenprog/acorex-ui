import { ToastrService } from 'ngx-toastr';
import { inject, Injectable } from '@angular/core';

export interface IToastOptions {
    timeOut?: number;
    title?: string,
    closebutton?: boolean;
}

@Injectable()
export class ToastService {
    constructor(private toastr: ToastrService) {

    }
    private options = {
        positionClass: "toast-bottom-center",
        tapToDismiss: false,
        progressBar: true,
        closeButton: true,
        timeOut: 5000,
        extendedTimeOut: 5000
    }
    info(message: string, options?: IToastOptions) {
        this.toastr.info(message, options ? options.title : null, this.getOptions(options))
    }
    sucess(message: string, options?: IToastOptions) {
        this.toastr.success(message, options ? options.title : null, this.getOptions(options));
    }
    warning(message: string, options?: IToastOptions) {
        this.toastr.warning(message, options ? options.title : null, this.getOptions(options))
    }
    error(message: string, options?: IToastOptions) {
        this.toastr.error(message, options ? options.title : null, this.getOptions(options));
    }

    private getOptions(options?: IToastOptions): any {
        if (options) {
            let opt = Object.assign({}, this.options);
            if (options.closebutton != null)
                opt.closeButton = options.closebutton;
            if (options.timeOut != null)
                opt.timeOut = options.timeOut;

            return opt;
        }
        else {
            return Object.assign({}, this.options);
        }
    }
}