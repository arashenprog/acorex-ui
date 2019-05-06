import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AcoreXUIModule } from 'acorex-ui';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AcoreXUIModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
