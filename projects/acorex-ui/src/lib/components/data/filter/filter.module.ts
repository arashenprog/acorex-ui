import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFilterPanelComponent } from './filter-panel/filter-panel.component';
import { AXCoreModule } from '../../../core/core.module';
import { AXPanelBoxModule } from '../../layout/panel-box/panel-box.module';
import { AXCheckBoxModule } from '../../form/checkbox/checkbox.module';
import { AXTextBoxModule } from '../../form/text-box/text-box.module';
import { AXButtonModule } from '../../form/button/button.module';
import { AXToolbarModule } from '../../layout/toolbar/toolbar.module';
import { AXSelectionListModule } from '../../form/selection-list/selection-list.module';
import { AXFilterColumnStringComponent } from './columns/filter-column-string.component';
import { FormsModule } from '@angular/forms';
import { AXFilterColumnSelectionComponent } from './columns/filter-column-selection.component';
import { AXFilterColumnDateComponent } from './columns/filter-column-date.component';


@NgModule({
    declarations: [AXFilterPanelComponent,AXFilterColumnStringComponent,AXFilterColumnSelectionComponent,AXFilterColumnDateComponent],
    imports: [ CommonModule,FormsModule,AXCoreModule,AXPanelBoxModule,AXCheckBoxModule,AXTextBoxModule,AXToolbarModule,AXSelectionListModule,AXButtonModule ],
    exports: [AXFilterPanelComponent,AXFilterColumnStringComponent,AXFilterColumnSelectionComponent,AXFilterColumnDateComponent],
    providers: [],
})
export class AXFilterModule {}