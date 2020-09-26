import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Color, AXColorUtil } from '../../../../core/color.class';
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

    inputFormat: 'hex' | 'rgb' = 'hex'

    constructor() {
        super();
    }

    @Output()
    onColorSelect: EventEmitter<string> = new EventEmitter<string>();

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
                let selected = this.colors.find(c => c.code == v);
                if (selected) {
                    this.selectColor(selected);
                }
                else {
                    this.colors.forEach((i) => {
                        i.active = false
                    });
                }
                const rgb = AXColorUtil.hex2Rgb(v)

                if (rgb) {
                    this.rColor = rgb.r;
                    this.gColor = rgb.g;
                    this.bColor = rgb.b;
                }
            }
            else {
                this.rColor = null;
                this.gColor = null;
                this.bColor = null;
            }
            this.valueChange.emit(v);
        }
    }

    rColor: number = 0;
    gColor: number = 0;
    bColor: number = 0;


    colors: Color[] = [
        // Pink  ***************************
        {
            code: '#FFC0CB',
        },
        {
            code: '#FF69B4',
        },
        {
            code: '#DB7093',
        },
        {
            code: '#C71585',
        },
        // Purple ***************************
        {
            code: '#E6E6FA',
        },
        {
            code: '#D8BFD8',
        },
        {
            code: '#DDA0DD',
        },
        {
            code: '#DA70D6',
        },
        {
            code: '#FF00FF',
        },
        {
            code: '#BA55D3',
        },
        {
            code: '#9932CC',
        },
        {
            code: '#8A2BE2',

        },
        {
            code: '#8B008B',
        },
        {
            code: '#9370DB',
        },
        {
            code: '#7B68EE',
        },
        {
            code: '#6A5ACD',
        },
        {
            code: '#483D8B',
        },
        {
            code: '#663399',
        },
        {
            code: '#4B0082',
        },
        // Red  ***************************
        {
            code: '#FFA07A',
        },
        {
            code: '#FA8072',
        },
        {
            code: '#F08080',
        },
        {
            code: '#CD5C5C',
        },
        {
            code: '#DC143C',
        },
        {
            code: '#FF0000',
        },
        {
            code: '#B22222',
        },
        {
            code: '#8B0000',
        },
        // Orange ***************************
        {
            code: '#FFA500',
        },
        {
            code: '#FF8C00',
        },
        {
            code: '#FF7F50',
        },
        {
            code: '#FF6347',
        },
        {
            code: '#FF4500',
        },
        {
            code: '#FFD700',
        },
        // Yellow ***************************
        {
            code: '#FFFF00',
        },
        {
            code: '#FFFFE0',
        },
        {
            code: '#FFFACD',
        },
        {
            code: '#FFEFD5',
        },
        {
            code: '#FFE4B5',
        },
        {
            code: '#FFDAB9',
        },
        {
            code: '#EEE8AA',
        },
        {
            code: '#F0E68C',
        },
        {
            code: '#BDB76B',
        },
        //  Brown ***************************
        // {
        //     code: '#FFF8DC'
        // },
        // {
        //     code: '#FFEBCD'
        // },
        // {
        //     code: '#FFE4C4'
        // },
        {
            code: '#FFDEAD'
        },
        {
            code: '#DEB887'
        },
        {
            code: '#D2B48C'
        },
        {
            code: '#DAA520'
        },
        {
            code: '#B8860B'
        },
        {
            code: '#CD853F'
        },
        {
            code: '#D2691E'
        },
        {
            code: '#8B4513'
        },
        {
            code: '#A0522D'
        },
        // Green ***************************
        {
            code: '#ADFF2F',
        },
        {
            code: '#7FFF00',
        },
        {
            code: '#00FF00',
        },
        {
            code: '#32CD32',
        },
        {
            code: '#98FB98',
        },
        {
            code: '#90EE90',
        },
        {
            code: '#00FA9A',
        },
        {
            code: '#00FF7F',
        },
        {
            code: '#3CB371',
        },
        {
            code: '#2E8B57',
        },
        {
            code: '#228B22',
        },
        {
            code: '#008000',
        },
        {
            code: '#006400',
        },
        {
            code: '#9ACD32',
        },
        {
            code: '#6B8E23',
        },
        {
            code: '#556B2F',
        },
        {
            code: '#66CDAA',
        },
        {
            code: '#8FBC8F',
        },
        {
            code: '#20B2AA',
        },
        {
            code: '#008B8B',
        },
        //  Cyan ***************************

        {
            code: '#E0FFFF',
        },
        {
            code: '#AFEEEE',
        },
        {
            code: '#7FFFD4',
        },
        {
            code: '#40E0D0',
        },
        {
            code: '#48D1CC',
        },
        {
            code: '#00CED1',
        },
        //  Blue ***************************
        {
            code: '#5F9EA0'
        },
        {
            code: '#4682B4'
        },
        {
            code: '#B0C4DE'
        },
        {
            code: '#ADD8E6'
        },
        {
            code: '#B0E0E6'
        },
        {
            code: '#87CEFA'
        },
        {
            code: '#87CEEB'
        },
        {
            code: '#6495ED'
        },
        {
            code: '#00BFFF'
        },
        {
            code: '#00FFFF',
        },
        {
            code: '#1E90FF'
        },
        {
            code: '#4169E1'
        },
        {
            code: '#0000FF'
        },
        {
            code: '#0000CD'
        },
        {
            code: '#00008B'
        },
        {
            code: '#191970'
        },
        // Gray
        {
            code: '#FFFFFF'
        },
        {
            code: '#DCDCDC'
        },
        {
            code: '#808080'
        },
        {
            code: '#708090'
        },
        {
            code: '#000000'
        },
        //
        // {
        //     code: '#f44336',
        //     color: "#f44336",
        //     active: true
        // },
        // {
        //     code: '#E91E63',
        //     color: "#E91E63"
        // },
        // {
        //     code: '#9C27B0',
        //     color: "#9C27B0"
        // },
        // {
        //     code: '#673AB7',
        //     color: "#673AB7"
        // },
        // {
        //     code: '#3F51B5',
        //     color: "#3F51B5"
        // },
        // {
        //     code: '#2196F3',
        //     color: "#2196F3"
        // },
        // {
        //     code: '#03A9F4',
        //     color: "#03A9F4"
        // },
        // {
        //     code: '#00BCD4',
        //     color: "#00BCD4"
        // },
        // {
        //     code: '#009688',
        //     color: "#009688"
        // },
        // {
        //     code: '#4CAF50',
        //     color: "#4CAF50"
        // },
        // {
        //     code: '#8BC34A',
        //     color: "#8BC34A"
        // },
        // {
        //     code: '#CDDC39',
        //     color: "#CDDC39"
        // },
        // {
        //     code: '#FFEB3B',
        //     color: "#FFEB3B"
        // }, {
        //     code: '#FFC107',
        //     color: "#FFC107"
        // },
        // {
        //     code: '#FF9800',
        //     color: "#FF9800"
        // },
        // {
        //     code: '#FF5722',
        //     color: "#FF5722"
        // },
        // {
        //     code: '#795548',
        //     color: "#795548"
        // },
        // {
        //     code: '#607D8B',
        //     color: "#607D8B"
        // },
        // {
        //     code: '#ffffff',
        //     color: "#ffffff"
        // },
        // {
        //     code: '#000000',
        //     color: "#000000"
        // }
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
        this.onColorSelect.emit(this.value);
    }

    handleColorChange() {
        this.value = AXColorUtil.rgb2Hex(this.rColor, this.gColor, this.bColor);

    }

    private selectColor(item: Color) {
        this.colors.forEach((i) => {
            i.active = false
        });
        item.active = true
    }

    handleKeyEvent(e: KeyboardEvent) {
        if (e.code == 'Enter' || e.code == 'NumpadEnter') {
            this.onColorSelect.emit(this.value);
        }
    }
}
