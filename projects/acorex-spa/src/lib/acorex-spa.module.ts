import { NgModule } from "@angular/core";
import { AXTabularModule } from "./layouts/tabular/tabular.module";
import { AXNavMenuService } from './layouts/shared/services/nav-menu.service';
import { AXBlankModule } from './layouts/blank/blank.module';
import { AXTopMenuModule } from "./layouts/topmenu/topmenu.module";


@NgModule({
  declarations: [
    
  ],
  imports: [
    AXTabularModule,
    AXBlankModule,
    AXTopMenuModule,
  ],
  exports: [
    AXTabularModule,
    AXBlankModule,
    AXTopMenuModule
  ],
  providers: [{
    provide: AXNavMenuService,
    useValue: null
  }]
})
export class AcorexSpaModule { }
