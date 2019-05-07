import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AXTabPageService, ITabPage, ITabPageMessage } from './tab-page.service';
import { ClosingEventArgs } from '../popup/popup.service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ax-tab-page-renderer',
    template: `<template #container></template><div *ngIf="isBusy" class="loading-overlay"></div>`,
})
// tslint:disable-next-line:component-class-suffix
export class AXTabPageRendererComponent {
    childs: any[] = [];
    isBusy: boolean = false;
    @ViewChild("container", { read: ViewContainerRef }) container;

    constructor(
        private resolver: ComponentFactoryResolver,
        tabService: AXTabPageService,
        titleService: Title) {
        tabService.opened.subscribe((tab: ITabPage) => {
            this.isBusy = tab.isBusy;
            this.childs.forEach(v => {
                v.hostView.rootNodes[0].hidden = true;
            });
            let v = this.childs.find(t => t.id == tab.id);
            if (v) {
                v.hostView.rootNodes[0].hidden = false;
            }
            else {
                const factory = this.resolver.resolveComponentFactory(tab.content);
                let componentRef = this.container.createComponent(factory);
                componentRef.id = tab.id;
                if (!componentRef.instance.closeEvent) {
                   throw Error("The Component must be inherited from AXBasePageComponent!")
                }
                componentRef.instance.closeEvent.subscribe((e: ClosingEventArgs) => {
                    tabService.close(tab, e);
                });
                //
                tab.content = componentRef.instance;
                this.childs.push(componentRef);
            }
            titleService.setTitle(tab.title);
        });
        tabService.closed.subscribe((tab: ITabPage) => {
            let com = this.childs.find(c => c.id == tab.id);
            com.destroy();
            this.childs = this.childs.filter(c => c.id != tab.id);
        });
        tabService.received.subscribe((m: ITabPageMessage) => {
            let com = this.childs.find(c => c.id == m.tab.id);
            if (com)
                com.instance.onReceiveData(m.data);
        })
    }
}