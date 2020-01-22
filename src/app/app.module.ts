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
import { EditorsPage } from './modules/demo/editors/editors.page';
import { CommonModule } from '@angular/common';

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
    redirectTo: "layout2",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    FormsModule,
    ACoreXUIModule,
    ACoreXSPAModule,
    DemoModule,
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
    },
    {
      provide: "startUpTab",
      useValue: {
        content: EditorsPage,
        title: "Dashboard",
        closable: true,
        uid: "dashboard"
      }
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
