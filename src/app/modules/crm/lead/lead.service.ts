import { Injectable } from '@angular/core';
import { AXHttpService, PromisResult } from 'acorex-ui';
import { LeadListModel } from './lead.model';

@Injectable()
export class LeadService  {

    constructor(private http:AXHttpService)
    {

    }

    getList():PromisResult<LeadListModel[]>
    {
        // return new PromisResult<LeadListModel[]>((resolve)=>{
        //     ret
        // }) ;

        return PromisResult.resolve([
            {
                name:"Chris",
                company:"google",
                email:"mokuba_2006@hotmail.com",
                phone:"(043) 155-1174",
                source:"Chat",
                owner:"Sam Degani",
            },
            {
                name:"Joshua Kidd",
                company:"WebSite Visit",
                email:"	michaeljacob.georges@yahoo.com.ai",
                phone:"(041) 810-3333",
                source:"WebSite Visit",
                owner:"Sam Degani",
            },
        ])
    }

}