import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AcoreXUIModule } from 'acorex-ui';
import { AcorexSpaModule } from 'projects/acorex-spa/src/lib/acorex-spa.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    AcoreXUIModule,
    AcorexSpaModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
