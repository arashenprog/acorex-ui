import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AXAccordionComponent } from "./accordion.component";
import { AXPanelBoxModule } from "../panel-box/panel-box.module";
@NgModule({
    declarations: [AXAccordionComponent],
    imports: [CommonModule, AXPanelBoxModule],
    exports: [AXAccordionComponent],
    providers: []
})
export class AXAccordionModule { }
