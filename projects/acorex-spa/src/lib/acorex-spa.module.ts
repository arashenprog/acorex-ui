import { NgModule } from "@angular/core";
import { AXTabularModule } from "./layouts/tabular/tabular.module";
import { AXNavMenuService } from './layouts/shared/services/nav-menu.service';
import { AXBlankModule } from './layouts/blank/blank.module';


@NgModule({
  declarations: [
  ],
  imports: [
    AXTabularModule,
    AXBlankModule
  ],
  exports: [
    AXTabularModule,
    AXBlankModule
  ],
  providers: [{
    provide: AXNavMenuService,
    useValue: null
  }]
})
export class AcorexSpaModule { }
