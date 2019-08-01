import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFilterPanelComponent } from './filter-panel/filter-panel.component';
import { AXCoreModule } from '../../../core/core.module';
import { AXPanelBoxModule } from '../../layout/panel-box/panel-box.module';
import { AXCheckBoxModule } from '../../form/checkbox/checkbox.module';
import { AXTextBoxModule } from '../../form/text-box/text-box.module';
import { AXToolbarModule } from '../../layout/toolbar/toolbar.module';
import { AXFilterColumnStringComponent } from './columns/filter-column-string.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [AXFilterPanelComponent,AXFilterColumnStringComponent],
    imports: [ CommonModule,FormsModule,AXCoreModule,AXPanelBoxModule,AXCheckBoxModule,AXTextBoxModule,AXToolbarModule ],
    exports: [AXFilterPanelComponent,AXFilterColumnStringComponent],
    providers: [],
})
export class AXFilterModule {}