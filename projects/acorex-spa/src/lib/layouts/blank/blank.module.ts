import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AXBlankLayoutComponent } from "./blank.layout";
import { AcoreXUIModule } from 'acorex-ui';


@NgModule({
  declarations: [AXBlankLayoutComponent],
  imports: [RouterModule, FormsModule,AcoreXUIModule],
  exports: [AXBlankLayoutComponent],
  providers: []
})
export class AXBlankModule {}
