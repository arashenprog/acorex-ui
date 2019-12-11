import { Component, OnInit } from '@angular/core';


export interface AXTimeItem {
    active: boolean,
    text: string
}
@Component({
    selector: 'ax-time-box',
    templateUrl: './time-box.component.html',
    styleUrls: ['./time-box.component.scss']
})
export class AXTimeBoxComponent {
    constructor() { }

    hours: any[] = [];
    mins: any[] = [];
    obj: AXTimeItem;
    setHours() {
        for (let i = 1; i <= 12; i++) {
            let _i = i.toString()
            if (_i.length < 2) {
                _i = "0" + _i
                this.obj = { active: false, text: _i }
                this.hours.push(this.obj)
            }
            else {
                this.obj = { active: false, text: _i }
                this.hours.push(this.obj)
            }
        }
    }
    setMins() {
        this.mins.push({ active: false, text: "00" });
        for (let i = 1; i <= 59; i++) {
            let _i = i.toString()
            if (_i.length < 2) {
                _i = "0" + _i
                this.obj = { active: false, text: _i }
                this.mins.push(this.obj)
            }
            else {
                this.obj = { active: false, text: _i }
                this.mins.push(this.obj)
            }
        }
    }
    ngOnInit(): void {
        this.setHours()
        this.setMins()
    }
    ngAfterViewInit(): void {
        console.log(this.mins)
    }
}
