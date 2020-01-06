import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AXBlankLayoutComponent } from "./blank.layout";
import { ACoreXUIModule } from 'acorex-ui';


@NgModule({
  declarations: [AXBlankLayoutComponent],
  imports: [RouterModule, FormsModule,ACoreXUIModule],
  exports: [AXBlankLayoutComponent],
  providers: []
})
export class AXBlankModule {}
