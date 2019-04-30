import { Component, ViewChild } from "@angular/core";
import { AXValidationFormComponent } from "projects/acorex-ui/src/lib/components/validation/validation-form.component";
import { IValidationRuleResult } from 'projects/acorex-ui/src/lib/components/validation/validation.classs';
import { ToastService } from 'projects/acorex-ui/src/lib/components/toast/toast.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  @ViewChild("form") form: AXValidationFormComponent;

  constructor(private toast:ToastService)
  {

  }

  title = "acorex-framework";
  menuItems: Array<any> = [
    { text: "گزینه 1" },
    { text: "گزینه 2" },
    { text: "گزینه 3" },
    { text: "گزینه 4" },
    { text: "گزینه 5" }
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
    this.form.validate().then(c => {
      console.log(c);
      this.toast.sucess("Hello Word!");
    });
  }

  regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


  customValidation(value: string): Promise<IValidationRuleResult> {
    return new Promise<IValidationRuleResult>(resolve => {
      setTimeout(() => {
        if (value == "arash")
          resolve({ result: true });
        else
          resolve({ result: false, message: "!!!!!" });
      }, 1000);
    });
  }
}
