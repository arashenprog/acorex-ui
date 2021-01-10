import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ax-time-box',
    templateUrl: './time-box.component.html',
    styleUrls: ['./time-box.component.scss']
})
export class AXTimeBoxComponent {
    constructor() { }

    hours: number[] = [];
    mins: string[] = [];

    setHours() {
        for (let i = 1; i <= 12; i++) {
            this.hours.push(i)
        }
        return this.hours;
    }
    ngOnInit(): void {
        this.setHours()
    }
    ngAfterViewInit(): void {
    }
}
