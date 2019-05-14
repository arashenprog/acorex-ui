import { NgModule } from "@angular/core";
import { AXTabularModule } from "./layouts/tabular/tabular.module";
import { AXPageComponent } from './layouts/shared/page/page.component';
import { AXPageContentComponent } from './layouts/shared/page/content.component';
import { AXNavMenuService } from './layouts/shared/services/nav-menu.service';
import { AXPageFooterComponent } from './layouts/shared/page/footer.component';


@NgModule({
  declarations: [
  ],
  imports: [
    AXTabularModule,
  ],
  exports: [
    AXTabularModule,
  ],
  providers: [{
    provide: AXNavMenuService,
    useValue: null
  }]
})
export class AcorexSpaModule { }
