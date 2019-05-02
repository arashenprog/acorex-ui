import { Component, ViewChild } from "@angular/core";
import { AXValidationFormComponent } from "projects/acorex-ui/src/lib/components/validation/validation-form.component";
import { IValidationRuleResult } from "projects/acorex-ui/src/lib/components/validation/validation.classs";
import { ToastService } from "projects/acorex-ui/src/lib/components/toast/toast.service";
import { DialogService } from "projects/acorex-ui/src/lib/components/popup/dialog.service";
import { PopupService } from "projects/acorex-ui/src/lib/components/popup/popup.service";
import { AXHttpService } from 'projects/acorex-ui/src/public-api';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  constructor(
    private dialog: DialogService,
    private popup: PopupService,
    private toast: ToastService,
    private http: AXHttpService
  ) { }
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
    this.toast.success("عملیات با موفقیت انجام شد", {
      timeOut: 10000,
      closeable: true
    });
    this.form.validate().then(c => {
      console.log(c);
      this.loading = false;

      this.toast.error("مقادیر نام و نام خانوادگی تکراری است", {
        timeOut: 5000,
        title: "خطا",
        closeable: true
      });
    });
  }
  onDialogClick() {
    this.http.get("https://jsonplaceholder.typicode.com//todos")
      .result(c => {
        console.log("result", c);
      })
      .error(c => { console.log("error", c); })
    this.dialog.alert("هشدار", "شما روی کلید نمایش کلیک کردید");
  }
  onPopupClick() {
    this.popup.open("a", "عنوان");
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
