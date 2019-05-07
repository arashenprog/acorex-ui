import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "ax-image",
  templateUrl: "./image-view.component.html",
  styleUrls: ["./image-view.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXImageViewComponent implements OnInit {
  constructor() {}
  @Input()
  src: string;
  imageSrc: string;
  showModal: boolean = false;
  ngOnInit(): void {}

  onImageClick(e) {
    this.imageSrc = e.target.currentSrc;
    this.showModal = true;
  }
  onContainerImageClick() {
    this.showModal = false;
  }
}
