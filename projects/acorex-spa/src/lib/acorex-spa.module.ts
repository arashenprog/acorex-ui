import { NgModule } from "@angular/core";
import { AXTabularModule } from "./layouts/tabular/tabular.module";
import { AXPageComponent } from './layouts/shared/page/page.component';
import { AXPageContentComponent } from './layouts/shared/page/content.component';
import { AXNavMenuService } from './layouts/shared/services/nav-menu.service';
import { AXPageFooterComponent } from './layouts/shared/page/footer.component';
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
