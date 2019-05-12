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
    
      title = "acorex-framework";
      menuItems: Array<any> = [
        { text: "گزینه 1" },
        { text: "گزینه 2" },
        { text: "گزینه 3" },
        { text: "گزینه 4" },
        { text: "گزینه 5" }
      ];
      defaultBindingsList = [
        { value: 1, label: "اصفهان" },
        { value: 2, label: "تهران" },
        { value: 3, label: "گیلان", disabled: true }
      ];
      check_box_items_inline: Array<any> = [
        {
          value: 1,
          text: "گزینه اول",
          name: "onei"
        },
        {
          value: 2,
          text: "گزینه دوم",
          name: "twoi"
        },
        {
          value: 3,
          text: "گزینه سوم",
          name: "threei"
        },
        {
          value: 4,
          text: "گزینه چهارم",
          name: "fouri"
        },
        {
          value: 5,
          text: "گزینه پنجم",
          name: "fivei"
        }
      ];
    
      onClick() {
        this.loading = true;
        debugger;
        this.toast.success("عملیات با موفقیت انجام شد", {
          title : "تست",
          timeOut: 3000,
          closeable: true
        });
        this.form.validate().then(c => {
          this.loading = false;
    
          // this.toast.error("مقادیر نام و نام خانوادگی تکراری است", {
          //   timeOut: 1000,
          //   title: "خطا",
          //   closeable: true
          // });
        });
      }
      onDialogClick() {
        this.http.get("https://jsonplaceholder.typicodes.com/todos", {
          params: { name: "arash" }
        })
          .result(c => {
            console.log(c);
          }).complete(() => {
            console.log("complete");
          })
        //this.dialog.alert("هشدار", "شما روی کلید نمایش کلیک کردید");
      }
      onPopupClick() {
        this.tab.open(TestPageComponent, "عنوان");
        //this.popup.open(TestPageComponent, "عنوان");
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
