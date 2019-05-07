import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXTabComponent } from "./tab.component";
import { AXTabViewComponent } from "./tab-view.component";
import { DynamicTabsDirective } from "./dynamic-tabs.directive";
@NgModule({
  declarations: [AXTabComponent, AXTabViewComponent, DynamicTabsDirective],
  imports: [CommonModule],
  exports: [AXTabComponent, AXTabViewComponent, DynamicTabsDirective],
  providers: []
})
export class AXTabViewModule {}
