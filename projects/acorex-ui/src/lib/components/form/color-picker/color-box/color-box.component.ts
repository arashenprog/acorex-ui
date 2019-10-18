import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Color } from '../../../../core/color.class';
import { AXValidatableComponent } from '../../../../core/base.class';
import { IValidationRuleResult } from '../../validation/validation.classs';

@Component({
    selector: 'ax-color-box',
    templateUrl: './color-box.component.html',
    styleUrls: ['./color-box.component.scss'],
    providers: [
        { provide: AXValidatableComponent, useExisting: AXColorBoxComponent },
    ]
})
export class AXColorBoxComponent extends AXValidatableComponent {



    constructor() {
        super();
    }

    @Output()
    valueChange: EventEmitter<string> = new EventEmitter<string>();

    private _value: string;

    @Input()
    public get value(): string {
        return this._value;
    }
    public set value(v: string) {
        if (v != this._value) {
            this._value = v;
            if (v) {
                let selected = this.colors.find(c => c.color == v);
                if (selected)
                    this.selectColor(selected);
            }
            this.valueChange.emit(v);
        }
    }


    colors: Color[] = [
        {
            code: '#f44336',
            color: "#f44336",
            active: true
        },
        {
            code: '#E91E63',
            color: "#E91E63"
        },
        {
            code: '#9C27B0',
            color: "#9C27B0"
        },
        {
            code: '#673AB7',
            color: "#673AB7"
        },
        {
            code: '#3F51B5',
            color: "#3F51B5"
        },
        {
            code: '#2196F3',
            color: "#2196F3"
        },
        {
            code: '#03A9F4',
            color: "#03A9F4"
        },
        {
            code: '#00BCD4',
            color: "#00BCD4"
        },
        {
            code: '#009688',
            color: "#009688"
        },
        {
            code: '#4CAF50',
            color: "#4CAF50"
        },
        {
            code: '#8BC34A',
            color: "#8BC34A"
        },
        {
            code: '#CDDC39',
            color: "#CDDC39"
        },
        {
            code: '#FFEB3B',
            color: "#FFEB3B"
        }, {
            code: '#FFC107',
            color: "#FFC107"
        },
        {
            code: '#FF9800',
            color: "#FF9800"
        },
        {
            code: '#FF5722',
            color: "#FF5722"
        },
        {
            code: '#795548',
            color: "#795548"
        },
        {
            code: '#607D8B',
            color: "#607D8B"
        },
        {
            code: '#ffffff',
            color: "#ffffff"
        },
        {
            code: '#000000',
            color: "#000000"
        }
    ]


    validate(): Promise<IValidationRuleResult> {

        return new Promise<IValidationRuleResult>(resolve => {
            if (!this.validator) {
                resolve({ result: true });
            } else {
                // this.validator.validate(this.model).then(r => {
                //     r.target = this;
                //     if (r.result) {
                //         this.errorText = null;
                //     } else {
                //         this.errorText = r.message;
                //     }
                //     resolve(r);
                // });

                resolve()
            }
        });
    }

    focus() {
    }

    clear(): void {
        this.value = null;
    }

    onColorClick(item: Color) {
        this.value = item ? item.code : null;
        this.selectColor(item);

    }

    private selectColor(item: Color) {
        this.colors.forEach((i) => {
            i.active = false
        });
        item.active = true
    }
}
