import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskDetailComponent } from "./pages/tasks-detail.page";
import { ACoreXUIModule } from "acorex-ui";
import { AcorexSpaModule } from "acorex-spa";

@NgModule({
  declarations: [TaskDetailComponent],
  imports: [CommonModule, ACoreXUIModule, AcorexSpaModule],
  exports: [TaskDetailComponent],
  providers: [],
  entryComponents: [TaskDetailComponent]
})
export class TaskModule {}
