import { NgModule } from "@angular/core";
import { AXTabularModule } from "./layouts/tabular/tabular.module";
import { AXPageComponent } from './layouts/shared/page.component';
import { AXPageContentComponent } from './layouts/shared/content.component';


@NgModule({
  declarations: [
    AXPageComponent,
    AXPageContentComponent
  ],
  imports: [
    AXTabularModule,
  ],
  exports: [
    AXTabularModule,
    AXPageComponent,
    AXPageContentComponent
  ]
})
export class AcorexSpaModule {}
