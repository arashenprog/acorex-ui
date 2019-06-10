import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent, PromisResult, AXHttpService } from 'acorex-ui';

@Component({
    selector: 'ali-page',
    templateUrl: './ali.page.html',
    styleUrls: ['./ali.page.scss']
})
export class AliPage extends AXBasePageComponent {
    
    constructor(private http: AXHttpService) {
        super()
     }

    ngOnInit(): void { }
    provideListData = () => {
        return new PromisResult(resolve => {
          this.http
            .get("https://jsonplaceholder.typicode.com/users", {})
            .result(c => {
              resolve((<any>c).slice(0,8));
              console.log(c);
            });
        });
      };
}
