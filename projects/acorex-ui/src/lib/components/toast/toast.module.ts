import { NgModule } from '@angular/core';
import { AXCoreModule } from '../../core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from './toast.service';

@NgModule({
    declarations: [],
    imports: [ AXCoreModule,ToastrModule.forRoot() ],
    exports: [],
    providers: [ToastService],
})
export class AXToastModule {}