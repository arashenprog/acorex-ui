import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent, CheckItem } from 'acorex-ui';

@Component({
    template: `
    <ax-page>
        <ax-page-content>
            <ax-container>
                <ax-row>
                    <ax-col col-md="12">
                        <ax-text-box label="edit box label" showClear="true">
                            <ax-button type="success">
                                <i class="fas fa-save"></i>
                            </ax-button>
                            <ax-button type="danger">
                                <i class="fas fa-times"></i>
                            </ax-button>
                        </ax-text-box>
                    </ax-col>
                </ax-row>
                
            </ax-container>
        </ax-page-content>
    </ax-page>
  `
})
export class TextBoxPage extends AXBasePageComponent {

    constructor() {
        super()
    }


}
