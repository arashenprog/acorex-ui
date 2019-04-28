import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXTabComponent } from "./tab.component";
import { AXTabPageComponent } from "./tabpage.component";
import { DynamicTabsDirective } from "./dynamic-tabs.directive";
@NgModule({
  declarations: [AXTabComponent, AXTabPageComponent, DynamicTabsDirective],
  imports: [CommonModule],
  exports: [AXTabComponent, AXTabPageComponent, DynamicTabsDirective],
  providers: []
})
export class AXTabPageModule {}
