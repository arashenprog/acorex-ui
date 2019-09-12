import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXFilterPanelComponent } from './filter-panel/filter-panel.component';
import { AXCoreModule } from '../../../core/core.module';
import { AXPanelBoxModule } from '../../layout/panel-box/panel-box.module';
import { AXCheckBoxModule } from '../../form/checkbox/checkbox.module';
import { AXTextBoxModule } from '../../form/text-box/text-box.module';
import { AXDatePickerModule } from '../../form/date-picker/date-picker.module';
import { AXButtonModule } from '../../form/button/button.module';
import { AXToolbarModule } from '../../layout/toolbar/toolbar.module';
import { AXSelectionListModule } from '../../form/selection-list/selection-list.module';
import { AXFilterColumnStringComponent } from './columns/filter-column-string.component';
import { FormsModule } from '@angular/forms';
import { AXFilterColumnSelectionComponent } from './columns/filter-column-selection.component';
import { AXFilterColumnDateComponent } from './columns/filter-column-date.component';
import { AXFilterColumnNumberComponent } from './columns/filter-column-number.component';
import { AXToolbarFilterViewComponent } from './toolbar/filter-toolbar.component';
import { AXMenuModule } from '../../layout/menu/menu.module';
import { AXValidationModule } from '../../form/validation/validation.module';
import { AXToastModule } from '../../layout/toast/toast.module';


const COMPONENTS = [
    AXFilterPanelComponent,
    AXFilterColumnStringComponent,
    AXFilterColumnSelectionComponent,
    AXFilterColumnDateComponent,
    AXFilterColumnNumberComponent,
    AXToolbarFilterViewComponent,
]

@NgModule({
    declarations: [COMPONENTS],
    imports: [
        CommonModule,
        FormsModule,
        AXCoreModule,
        AXPanelBoxModule,
        AXDatePickerModule,
        AXCheckBoxModule,
        AXTextBoxModule,
        AXValidationModule,
        AXToastModule,
        AXTextBoxModule,
        AXToolbarModule,
        AXMenuModule,
        AXSelectionListModule,
        AXButtonModule
    ],
    exports: [COMPONENTS],
    providers: [],
})
export class AXFilterModule { }