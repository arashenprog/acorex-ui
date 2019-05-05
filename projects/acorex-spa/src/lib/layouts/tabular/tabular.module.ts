import { NgModule } from "@angular/core";
import { TabularLayoutComponent } from "./tabular.layout";
import { AcoreXUIModule } from 'acorex-ui';
@NgModule({
  declarations: [TabularLayoutComponent],
  imports: [AcoreXUIModule],
  exports: [TabularLayoutComponent],
  providers: []
})
export class AXTabularModule {}
