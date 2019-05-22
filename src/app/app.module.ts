import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./shared/app.component";
import { AcoreXUIModule, IHttpError } from "acorex-ui";
import { AcorexSpaModule, AXNavMenuService, AXTabularLayoutComponent } from "acorex-spa";
import { FormsModule } from "@angular/forms";
import { NavMenuService } from "./shared/services/nav-menu.service";
import { AXHeaderBarMenuService } from "acorex-spa";
import { HeaderBarMenuService } from "./shared/services/header-bar-menu.service";
import { LoginPageComponent } from "./shared/login/login.page";
import { RouterModule, Routes } from '@angular/router';
import { DemoModule } from './modules/demo/demo.module';
import { CRMModule } from './modules/crm/crm.module';

const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: "home",
    component: AXTabularLayoutComponent
  },
];


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AcoreXUIModule,
    AcorexSpaModule,
    DemoModule,
    CRMModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: AXNavMenuService,
      useClass: NavMenuService
    },
    {
      provide: AXHeaderBarMenuService,
      useClass: HeaderBarMenuService
    }
  ],
  entryComponents: [
    LoginPageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
