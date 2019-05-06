import { NgModule } from "@angular/core";
import { AXTabularModule } from "./layouts/tabular/tabular.module";
import { AXSideMenuModule } from "./layouts/tabular/sidemenu/sidemenu.module";
import { AXHeaderModule } from "./layouts/tabular/header/header.module";
import { AXFooterModule } from "./layouts/tabular/footer/footer.module";
import { AXToolbarModule } from "./layouts/tabular/toolbar/toolbar.module";

@NgModule({
  declarations: [],
  imports: [
    AXTabularModule,
    AXSideMenuModule,
    AXHeaderModule,
    AXFooterModule,
    AXToolbarModule
  ],
  exports: [
    AXTabularModule,
    AXSideMenuModule,
    AXHeaderModule,
    AXFooterModule,
    AXToolbarModule
  ]
})
export class AcorexSpaModule {}
