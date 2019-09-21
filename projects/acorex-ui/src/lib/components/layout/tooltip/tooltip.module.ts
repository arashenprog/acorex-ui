import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXTooltipDirective } from './tooltip.directive';

@NgModule({
    declarations: [AXTooltipDirective],
    imports: [ CommonModule ],
    exports: [AXTooltipDirective],
    providers: [],
})
export class AXTooltipModule {}