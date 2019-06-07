import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  EventEmitter,
  Output
} from "@angular/core";

@Component({
  selector: "task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class TaskCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() icon: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() author: string;
  @Input() body: string;

  @Input() lessBody: boolean = false;
  @Input() buttons: TaskButtons[];

  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();

  onClickInner() {
    this.onClick.emit();
  }
}

interface TaskButtons {
  text: string;
  type: "success" | "danger" | "warning" | "info" | "primary" | "secondary";
  icon: string;
}
