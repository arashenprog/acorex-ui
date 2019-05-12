import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AcoreXUIModule, IHttpError, AXHttpErrorService } from 'acorex-ui';
import { AcorexSpaModule, AXNavMenuService } from 'acorex-spa';
import { FormsModule } from '@angular/forms';
import { TestPageComponent } from './test-page.component';
import { NavMenuService } from './services/nav-menu.service';
import { AX_HTTP_ERROR_INTERCEPTOR} from 'acorex-ui';

class MyIn implements AXHttpErrorService {
  intercept(error: IHttpError) {
    alert(error.message);
  }
}

@NgModule({
  declarations: [AppComponent, TestPageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AcoreXUIModule,
    AcorexSpaModule],
  providers: [
    {
      provide: "startUpTab",
      useValue: { content: TestPageComponent, title: "داشبورد", closable: false }
    },
    {
      provide: AXNavMenuService,
      useClass: NavMenuService
    },
    {
      provide: AX_HTTP_ERROR_INTERCEPTOR,
      useValue: new MyIn(),
      multi:true
    }
  ],
  entryComponents: [TestPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }




