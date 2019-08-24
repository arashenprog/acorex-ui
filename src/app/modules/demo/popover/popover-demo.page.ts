import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';

@Component({
    template: `
    <ax-button text="Open On Hover" id="btn1" ></ax-button>
    <ax-popover target="#btn1" closeMode="mouseout" openMode="hover"  
        placement="bottom-start"
        alignment="top-start"
        >
        <div style="width:200px;height:200px;">
            Content 1
        </div>
    </ax-popover>
    `,
})
export class PopoverDemoPage extends AXBasePageComponent {
    constructor() {
        super();
    }

}
