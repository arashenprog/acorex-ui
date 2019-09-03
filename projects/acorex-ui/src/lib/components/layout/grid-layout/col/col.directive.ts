import { Directive, OnInit, ElementRef, Renderer2, Input } from "@angular/core";

@Directive({
  selector: "[col-sm]"
})
export class AXColSmDirective implements OnInit {
  @Input("col-sm") value: number;
  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}
  ngOnInit() {
    this.renderer.addClass(
      this.hostElement.nativeElement,
      "col-sm-" + this.value + " gutter"
    );
  }
}

@Directive({
  selector: "[col-md]"
})
export class AXColMdDirective implements OnInit {
  @Input("col-md") value: number;
  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}
  ngOnInit() {
    this.renderer.addClass(
      this.hostElement.nativeElement,
      "col-md-" + this.value
    );
  }
}
@Directive({
  selector: "[col-lg]"
})
export class AXColLgDirective implements OnInit {
  @Input("col-lg") value: number;
  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}
  ngOnInit() {
    this.renderer.addClass(
      this.hostElement.nativeElement,
      "col-lg-" + this.value
    );
  }
}

@Directive({
  selector: "[col-xl]"
})
export class AXColXlDirective implements OnInit {
  @Input("col-xl") value: number;
  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}
  ngOnInit() {
    this.renderer.addClass(
      this.hostElement.nativeElement,
      "col-xl-" + this.value
    );
  }
}

@Directive({
  selector: "[display]"
})
export class AXDisplay implements OnInit {
  @Input("display") value: string;
  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}
  ngOnInit() {
    let keys = {
      none: "d-none",
      block: "d-block",
      inline: "d-inline",
      "h-xs": "d-sm-block",
      "h-sm": "d-sm-none",
      "h-md": "d-md-none",
      "h-lg": "d-lg-none",
      "h-xl": "d-lg-none",
      "d-sm": "d-sm-block",
      "d-md": "d-md-block",
      "d-lg": "d-lg-block",
      "d-xl": "d-lg-block"
    };
    if (this.value) {
      this.value.split(" ").forEach(v => {
        this.renderer.addClass(this.hostElement.nativeElement, keys[v]);
      });
    }
  }
}
