import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./shared/app.component";
import { ACoreXUIModule, IHttpError } from "acorex-ui";
import {
  ACoreXSPAModule,
  AXNavMenuService,
  AXTabularLayoutComponent,
  AXTopMenuLayoutComponent,
  AXMobileLayoutComponent,
  AXHeaderBarMenuService
} from "acorex-spa";
import { FormsModule } from "@angular/forms";
import { NavMenuService } from "./shared/services/nav-menu.service";
import { HeaderBarMenuService } from "./shared/services/header-bar-menu.service";
import { RouterModule, Routes } from "@angular/router";
import { DemoModule } from "./modules/demo/demo.module";
import { FormControllPage } from './modules/demo/formcontroll/formcontroll.page';

const routes: Routes = [
  {
    path: "layout1",
    component: AXTabularLayoutComponent,    
    loadChildren : "./modules/demo.module#DemoModule"
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
    redirectTo: "layout2",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ACoreXUIModule,
    ACoreXSPAModule,
    DemoModule,
    RouterModule.forRoot(routes),
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
        content: FormControllPage,
        title: "Dashboard",
        closable: false,
        uid: "dashboard"
      }
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
