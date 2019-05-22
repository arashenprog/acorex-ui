import {
  AXBasePageComponent,
  PromisResult,
  AXHttpService,
  CheckItem,
  AXToastService,
  DialogService,
  AXPopupService,
  MenuItem
} from "acorex-ui";
import { Component } from "@angular/core";
import { TestHttpComponent } from "./http-test.page";

@Component({
  templateUrl: "./demo-page.component.html"
})
export class DemoPage extends AXBasePageComponent {
  constructor(
    private http: AXHttpService,
    private toast: AXToastService,
    private dialog: DialogService,
    private popup: AXPopupService
  ) {
    super();
  }
  drawerOpen: boolean = false;
  //TODO : data structure select box
  selectBoxItems: any[] = [
    { value: 1, label: "New York" },
    { value: 2, label: "London" },
    { value: 3, label: "Paris", disabled: true }
  ];
  sectionList: CheckItem[] = [
    {
      text: "First",
      value: false
    },
    {
      text: "Second",
      value: false
    },
    {
      text: "Third",
      value: false
    },
    {
      text: "Fourth",
      value: false
    },
    {
      text: "Fifth",
      value: false
    }
  ];

  provideGridData = () => {
    return new PromisResult(resolve => {
      this.http
        .get("https://jsonplaceholder.typicode.com/todos", {})
        .result(c => {
          resolve(c);
          console.log(c);
        });
    });
  };
  provideListData = () => {
    return new PromisResult(resolve => {
      this.http
        .get("https://jsonplaceholder.typicode.com/users", {})
        .result(c => {
          resolve((<any>c).slice(0,8));
          console.log(c);
        });
    });
  };
  warningToast() {
    this.toast.warning("This is warning message", {
      timeOut: 2000,
      title: "Warning",
      closeable: true
    });
  }
  successToast() {
    this.toast.success("This is success message", {
      timeOut: 2000,
      title: "Success",
      closeable: true
    });
  }
  errorToast() {
    this.toast.error("This is error message", {
      timeOut: 2000,
      title: "Error",
      closeable: true
    });
  }
  infoToast() {
    this.toast.info("This is info message", {
      timeOut: 2000,
      title: "Info",
      closeable: true
    });
  }
  openPopup() {
    this.popup.open(TestHttpComponent, "Title Popup Here");
  }
  openDrawer() {
    this.drawerOpen = true;
  }
  openAlert() {
    this.dialog.alert("Alert", "This is alert message");
  }
  openAlertConfirm() {
    this.dialog.confirm("Confirm", "Confirm message can be here").okay(() => {
      alert("you clicked confirm");
    });
  }

  commandItems: MenuItem[] = [
    {
      name: "01",
      type: "success",
      icon: "fas fa-check text-primary"
    },
    {
      name: "02",
      type: "danger",
      icon: "fas fa-pen text-danger"
    }
  ];
}
