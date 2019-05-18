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
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    console.log(this.username)
  }
  isLoading: boolean = false;
  username:string=""
  onLoginClick() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigateByUrl("/home");
      this.isLoading = false;
    }, 1500);
  }


}
