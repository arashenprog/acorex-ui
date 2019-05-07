import { NgModule } from "@angular/core";
import { AXTabularLayoutComponent } from "./tabular.layout";
import { AcoreXUIModule } from 'acorex-ui';
import { RouterModule } from '@angular/router';
import { AXToolbarComponent } from './toolbar/toolbar.layout';
import { AXHeaderComponent } from './header/header.layout';
import { AXFooterComponent } from './footer/footer.layout';
import { AXSideMenuComponent } from './sidemenu/sidemenu.layout';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AXTabularLayoutComponent,
    AXHeaderComponent,
    AXToolbarComponent,
    AXFooterComponent,
    AXSideMenuComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    AcoreXUIModule,
  ],
  exports: [AXTabularLayoutComponent],
  providers: []
})
export class AXTabularModule { }
