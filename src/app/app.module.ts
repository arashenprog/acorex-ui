import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./shared/app.component";
import { ACoreXUIModule, IHttpError } from "acorex-ui";
import {
  AcorexSpaModule,
  AXNavMenuService,
  AXTabularLayoutComponent,
  AXTopMenuLayoutComponent,
  AXMobileLayoutComponent
} from "acorex-spa";
import { FormsModule } from "@angular/forms";
import { AngularSplitModule } from 'angular-split';
import { NavMenuService } from "./shared/services/nav-menu.service";
import { AXHeaderBarMenuService } from "acorex-spa";
import { HeaderBarMenuService } from "./shared/services/header-bar-menu.service";
import { LoginPageComponent } from "./shared/login/login.page";
import { RouterModule, Routes } from "@angular/router";
import { DemoModule } from "./modules/demo/demo.module";
import { CRMModule } from "./modules/crm/crm.module";
import { TaskCardModule } from './shared/components/task-card/task-card.module';
import { LeadListPage } from './modules/crm/lead/pages/lead-list.page';

const routes: Routes = [
  {
    path: "layout1",
    component: AXTabularLayoutComponent
  },
  {
    path: "layout2",
    component: AXTopMenuLayoutComponent
  },
  {
    path: "layout3",
    component: AXMobileLayoutComponent
  },
  {
    path: "",
    redirectTo:"layout2",
    pathMatch:"full"
  }
];

@NgModule({
  declarations: [AppComponent, LoginPageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ACoreXUIModule,
    AcorexSpaModule,
    DemoModule,
    CRMModule,
    RouterModule.forRoot(routes),
    AngularSplitModule.forRoot(),
  ],
  providers: [
    {
      provide: AXNavMenuService,
      useClass: NavMenuService
    },
    {
      provide: AXHeaderBarMenuService,
      useClass: HeaderBarMenuService
    },
    {
      provide: "startUpTab",
      useValue: {
          content: LeadListPage,
          title: "Dashboard",
          closable: false,
          uid: "dashboard"
      }
  }
  ],
  entryComponents: [LoginPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
