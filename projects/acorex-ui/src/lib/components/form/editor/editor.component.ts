import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
@Component({
  selector: "ax-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AXEditorComponent {
  constructor() {}

  public model = {
    editorData: ""
  };
  public config = {
    placeholder: "Type the content here!",
    height:500
  };
  public Editor = ClassicEditor;

  @Output()
  onChange: EventEmitter<any> = new EventEmitter<any>();

  handleChange({ editor }: ChangeEvent) {
    let data = editor.getData();
    this.onChange.emit(data);
  }
}
