import { Component, OnInit, ElementRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import * as GoldenLayout from 'golden-layout';
declare var $: any;


@Component({
    selector: 'ax-dock-layout',
    templateUrl: './dock-layout.component.html',
    styleUrls: ['./dock-layout.component.scss']
})
export class AXDockLayoutComponent  {

    private config: any;
    private layout: any;

    constructor(
        private el: ElementRef,
        private viewContainer: ViewContainerRef) {
      

        this.config = {
            settings:{
                hasHeaders: true,
                showPopoutIcon: false,
                showMaximiseIcon: false,
                showCloseIcon: false
            },
            content: [{
                type: 'row',
                isClosable: false,
              
                content: [{
                    type:'component',
                    componentName: 'example',
                    width:200,
                    componentState: { text: 'Component 1' }
                },
                {
                    type:'component',
                    componentName: 'example',
                    componentState: { text: 'Component 2' }
                }]
            }]
        };

    

    }

    ngAfterViewInit(): void {
        this.layout = new GoldenLayout(this.config, $('#layoutContainer'));
        this.layout.registerComponent( 'example', function( container, state ){
            container.getElement().html( '<h2>' + state.text + '</h2>');
        });
        this.layout.init();
    }
}
