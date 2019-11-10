import { Injectable } from "@angular/core";
import { AXErrorService } from "../core/error/error.service";
import {
  AXHttpRequestOptions,
  IHttpError,
  AXHttpEventInterceptor
} from "../core/http/api";
import { PromisResult } from "../core/base.class";

@Injectable()
export class AXDefaultHttpInterceptor implements AXHttpEventInterceptor {
  constructor(private errorService: AXErrorService) {}

  begin(request: AXHttpRequestOptions): PromisResult<AXHttpRequestOptions> {
    return new PromisResult(resolve => {
      resolve(request);
    });
  }

  success(request: AXHttpRequestOptions, result: any): PromisResult<any> {
    // return new PromisResult((resolve)=>{
    //     result = {
    //         items: result
    //     }
    //     resolve(result);
    // });
    return PromisResult.resolve(result);
  }
  complete(request: AXHttpRequestOptions) {}
  error(request: AXHttpRequestOptions, error: IHttpError) {
    this.errorService.handle(error.message);
  }
}
