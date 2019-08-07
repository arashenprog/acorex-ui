import { Component, Input } from "@angular/core";
import { CheckItem } from "../../../core/menu.class";
import { AXBaseComponent } from "../../../core/base.class";
import { Observable } from "rxjs";
import { distinctUntilChanged, debounceTime } from "rxjs/operators";

@Component({
  selector: "ax-selection-list",
  templateUrl: "./selection-list.component.html"
})
export class AXSelectionListComponent extends AXBaseComponent {
  _uid: string = "M" + Math.ceil(Math.random() * 10000);
  @Input() direction: string = "horizontal";
  @Input() items: Array<CheckItem> = [];
  @Input() mode: string = "single";


  private itemChangeObserver:any;
  onRadioValueChange(item: CheckItem) {

    // if (!this.itemChangeObserver) {
    //   Observable.create(observer => {
    //     this.itemChangeObserver = observer;
    //   })
    //     .pipe(debounceTime(100))
    //     .pipe(distinctUntilChanged())
    //     .subscribe(z => {
          this.items.forEach(c => {
            c.selected = c.value == item.value;
          });
    //     });
    // }
    // this.itemChangeObserver.next(item);
  }
}
