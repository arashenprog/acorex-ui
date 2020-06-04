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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoPage } from './modules/demo/demo-page.component';
import { TestPage } from './modules/demo/test-page/test-page';

const routes: Routes = [
  {
    path: "layout1",
    component: DemoPage
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
    path: "test",
    component: TestPage
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
    BrowserModule,
    BrowserAnimationsModule,
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
        content: DemoPage,
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
