import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ax-responsive-menu',
  templateUrl: './responsive-menu.component.html',
  styleUrls: ['./responsive-menu.component.scss']
})
export class AXResponsiveMenuComponent implements OnInit {
  constructor() { }

  @Input() show: boolean = false;

  ngOnInit(): void { }

}
