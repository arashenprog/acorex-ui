import { NgModule } from "@angular/core";
import { AXTabularModule } from "./layouts/tabular/tabular.module";
import { AXNavMenuService } from './layouts/shared/services/nav-menu.service';
import { AXBlankModule } from './layouts/blank/blank.module';
import { AXTopMenuModule } from "./layouts/topmenu/topmenu.module";
import { AXMobileModule } from "./layouts/mobile/mobile.module";
import { AXPageModule } from "./layouts/shared/page/page.module";


@NgModule({
  declarations: [
    
  ],
  imports: [
    AXPageModule,
    AXTabularModule,
    AXBlankModule,
    AXTopMenuModule,
    AXMobileModule
  ],
  exports: [
    AXPageModule,
    AXTabularModule,
    AXBlankModule,
    AXTopMenuModule,
    AXMobileModule,
    
  ],
  providers: [{
    provide: AXNavMenuService,
    useValue: null
  }]
})
export class ACoreXSPAModule { }
