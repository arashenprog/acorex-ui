import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AcoreXUIModule, IHttpError,  } from 'acorex-ui';
import { AcorexSpaModule, AXNavMenuService } from 'acorex-spa';
import { FormsModule } from '@angular/forms';
import { TestPageComponent } from './test-page.component';
import { NavMenuService } from './services/nav-menu.service';
import { AXHeaderBarMenuService } from 'acorex-spa';
import { HeaderBarMenuService } from './services/header-bar-menu.service';
import { TestHttpComponent } from './pages/http-test.page';
import { LoginPageComponent } from './pages/login/login.page';


@NgModule({
  declarations: [AppComponent, TestPageComponent,TestHttpComponent,LoginPageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AcoreXUIModule,
    AcorexSpaModule],
  providers: [
    {
      provide: "startUpTab",
      useValue: { content: TestPageComponent, title: "Dashboard", closable: false }
    },
    {
      provide: AXNavMenuService,
      useClass: NavMenuService
    },
    {
      provide: AXHeaderBarMenuService,
      useClass: HeaderBarMenuService
    }
  ],
  entryComponents: [TestPageComponent,TestHttpComponent,LoginPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }




