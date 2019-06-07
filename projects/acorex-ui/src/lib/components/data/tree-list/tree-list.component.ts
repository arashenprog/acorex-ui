import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";

@Component({
  selector: "ax-tree-list",
  templateUrl: "./tree-list.component.html",
  styleUrls: ["./tree-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXTreeListComponent {
  constructor() {}
  @Input()
  dataSource: any[];

  ngAfterViewInit(): void {
    var toggler = document.getElementsByClassName("ax-tree-list-item");
    var i;

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
      });
    }
  }
}
