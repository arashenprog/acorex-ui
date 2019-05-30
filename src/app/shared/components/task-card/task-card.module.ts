import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './task-card.component';

@NgModule({
    declarations: [TaskCardComponent],
    imports: [ CommonModule ],
    exports: [TaskCardComponent],
    providers: [],
})
export class TaskCardModule {}