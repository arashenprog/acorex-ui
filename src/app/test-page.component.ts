import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IValidationRuleResult,
  DialogService,
  AXPopupService,
  AXToastService,
  AXHttpService,
  AXValidationFormComponent,
  AXTabPageService,
  AXBasePageComponent
} from "acorex-ui";

@Component({
  templateUrl: "./test-page.component.html"
})
export class TestPageComponent  extends AXBasePageComponent {
    constructor(
        private dialog: DialogService,
        private popup: AXPopupService,
        private tab: AXTabPageService,
        private toast: AXToastService,
        private http: AXHttpService
      ) { 
          super();
      }
      @ViewChild("form") form: AXValidationFormComponent;
      loading: boolean = false;
      drawerOpen:boolean=false;
    
      title = "acorex-framework";
      menuItems: Array<any> = [
        { text: "Option 1" },
        { text: "Option 2" },
        { text: "Option 3" },
        { text: "Option 4" },
        { text: "Option 5" }
      ];
      defaultBindingsList = [
        { value: 1, label: "New York" },
        { value: 2, label: "London" },
        { value: 3, label: "Paris", disabled: true }
      ];
      check_box_items_inline: Array<any> = [
        {
          value: 1,
          text: "Option one",
          name: "one"
        },
        {
          value: 2,
          text: "Option two",
          name: "two"
        },
        {
          value: 3,
          text: "Option three",
          name: "three"
        },
        {
          value: 4,
          text: "Option four",
          name: "four"
        },
        {
          value: 5,
          text: "Option five",
          name: "five"
        }
      ];
    
      onClick() {
        this.loading = true;
        this.drawerOpen=!this.drawerOpen;
        this.toast.success("Submit was done successfully", {
          title : "Test",
          timeOut: 30000,
          closeable: true
        });
        this.form.validate().then(c => {
          this.loading = false;
        });
      }
      onDialogClick() {
       
        this.dialog.alert("Warning", "You have clicked on the view button");
      }
      onPopupClick() {
        this.popup.open(TestPageComponent, "Title");
      }
      regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
      customValidation(value: string): Promise<IValidationRuleResult> {
        return new Promise<IValidationRuleResult>(resolve => {
          setTimeout(() => {
            if (value == "arash") resolve({ result: true });
            else resolve({ result: false, message: "!!!!!" });
          }, 1000);
        });
      }
}
