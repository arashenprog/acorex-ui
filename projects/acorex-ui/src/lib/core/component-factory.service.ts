import {
    ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable,
    Injector, EmbeddedViewRef, Type
} from '@angular/core';


@Injectable({providedIn: "root"})
export class AXComponentFactoryService {
    private _container: ComponentRef<any>;

    constructor(
        private applicationRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector) {
    }


    getRootViewContainer(): ComponentRef<any> {
        if (this._container) return this._container;

        if (this.applicationRef.components.length) return this.applicationRef.components[0];

        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
    }


    setRootViewContainer(container): void {
        this._container = container;
    }


    getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    getRootViewContainerNode(): HTMLElement {
        return this.getComponentRootNode(this.getRootViewContainer());
    }

    projectComponentInputs(component: ComponentRef<any>, options: any): ComponentRef<any> {
        if (options) {
            const props = Object.getOwnPropertyNames(options);
            for (const prop of props) {
                component.instance[prop] = options[prop];
            }
        }

        return component;
    }


    appendComponent<T>(
        componentClass: Type<T>,
        options: any = {},
        location: Element = this.getRootViewContainerNode()): ComponentRef<any> {

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        let componentRef = componentFactory.create(this.injector);
        let appRef: any = this.applicationRef;
        let componentRootNode = this.getComponentRootNode(componentRef);

        // project the options passed to the component instance
        this.projectComponentInputs(componentRef, options);

        appRef.attachView(componentRef.hostView);

        componentRef.onDestroy(() => {
            appRef.detachView(componentRef.hostView);
        });
        location.appendChild(componentRootNode);

        return componentRef;
    }

   
}