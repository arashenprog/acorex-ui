import {
    ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable,
    Injector, EmbeddedViewRef, Type
} from '@angular/core';


@Injectable({ providedIn: "root" })
export class AXRenderService {
    constructor(
        private appRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector) {
    }

    appendComponent<T>(
        componentClass: Type<T>,
        options: any = {},
        location?: Element): ComponentRef<any> {

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        let componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        this.projectComponentInputs(componentRef, options);
        
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        componentRef.onDestroy(() => {
            this.appRef.detachView(componentRef.hostView);
        });
        if (location) {
            location.appendChild(domElem);
        }
        else
        {
            document.body.appendChild(domElem);
        }

        return componentRef;
    }

    private projectComponentInputs(component: ComponentRef<any>, options: any): ComponentRef<any> {
        if (options) {
            const props = Object.getOwnPropertyNames(options);
            for (const prop of props) {
                component.instance[prop] = options[prop];
            }
        }

        return component;
    }

}