import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AcoreXUIModule } from 'acorex-ui';
import { AcorexSpaModule, AXNavMenuService } from 'acorex-spa';
import { FormsModule } from '@angular/forms';
import { TestPageComponent } from './test-page.component';
import { NavMenuService } from './services/nav-menu.service';


@NgModule({
  declarations: [AppComponent,TestPageComponent],
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
    }
  ],
  entryComponents:[TestPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
