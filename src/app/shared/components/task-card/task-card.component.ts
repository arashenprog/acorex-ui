import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";

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

  @Input() buttons: TaskButtons[];
}

interface TaskButtons {
  text: string;
  type: "success" | "danger" | "warning" | "info" | "primary" | "secondary";
  icon: string;
}
