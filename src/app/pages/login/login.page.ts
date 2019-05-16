import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AXBasePageComponent } from "acorex-ui";

@Component({
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent extends AXBasePageComponent {
  constructor(private router: Router) {
    super();
  }
  isLoading: boolean = false;
  onLoginClick() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigateByUrl("/home");
      this.isLoading = false;
    }, 1500);
  }
}
