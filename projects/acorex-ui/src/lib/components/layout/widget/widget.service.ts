import { Injectable, ReflectiveInjector } from '@angular/core';
import { AXWidgetComponent } from './widget.component';

export interface IWidget {
    name?: string;
    type?: any;
    title?: string;
    uid?: number;
    component?: AXWidgetComponent;
    cols?:number;
    rows?:number;
    x?:number;
    y?:number;
    options?:any;
}

@Injectable({ providedIn: "root" })
export class AXWidgetService {
    static types: IWidget[] = [];
    register(widget: IWidget) {
        widget.name = widget.type.name;
        AXWidgetService.types.push(widget)
    }

    resolve(widgetType: string): IWidget {
        return AXWidgetService.types.find(c => c.name == widgetType);
    }

    getItems(): IWidget[] {
        return AXWidgetService.types;
    }
}

const providers = ReflectiveInjector.resolve([AXWidgetService]);
const injector = ReflectiveInjector.fromResolvedProviders(providers);
const widgetService = injector.get(AXWidgetService);

export function registerWidget(widget: IWidget) {
    widgetService.register(widget);
}