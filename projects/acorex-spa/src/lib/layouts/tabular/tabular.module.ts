import { NgModule } from "@angular/core";
import { TabularLayoutComponent } from "./tabular.layout";
import { AcoreXUIModule } from 'acorex-ui';
import { AXToolbarModule } from './toolbar/toolbar.module';
import { AXSideMenuModule } from './sidemenu/sidemenu.module';
import { AXPageModule } from './page/page.module';
import { AXHeaderModule } from './header/header.module';
import { AXFooterModule } from './footer/footer.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [TabularLayoutComponent],
  imports: [RouterModule,AcoreXUIModule,AXToolbarModule,AXSideMenuModule,AXPageModule,AXHeaderModule,AXFooterModule],
  exports: [TabularLayoutComponent],
  providers: []
})
export class AXTabularModule {}
