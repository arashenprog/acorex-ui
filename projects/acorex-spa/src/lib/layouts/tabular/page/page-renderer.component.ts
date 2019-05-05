import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from "@angular/core";

import {
  PageTabService,
  IPageTab,
  IPageTabMessage,
  ClosingEventArgs
} from "acorex-ui";

import { Title } from "@angular/platform-browser";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "page-renderer",
  template: `
    <template #container></template>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AXPageRendererComponent {
  childs: any[] = [];
  @ViewChild("container", { read: ViewContainerRef }) container;

  constructor(
    private resolver: ComponentFactoryResolver,
    tabService: PageTabService,
    titleService: Title
  ) {
    tabService.opened.subscribe((tab: IPageTab) => {
      this.childs.forEach(v => {
        v.hostView.rootNodes[0].hidden = true;
      });
      let v = this.childs.find(t => t.id == tab.id);
      if (v) {
        v.hostView.rootNodes[0].hidden = false;
      } else {
        const factory = this.resolver.resolveComponentFactory(tab.content);
        let componentRef = this.container.createComponent(factory);
        componentRef.id = tab.id;
        componentRef.instance.closeEvent.subscribe((e: ClosingEventArgs) => {
          tabService.close(tab, e);
        });
        //
        tab.content = componentRef.instance;
        this.childs.push(componentRef);
      }
      titleService.setTitle(tab.title);
    });
    tabService.closed.subscribe((tab: IPageTab) => {
      let com = this.childs.find(c => c.id == tab.id);
      com.destroy();
      this.childs = this.childs.filter(c => c.id != tab.id);
    });
    tabService.received.subscribe((m: IPageTabMessage) => {
      let com = this.childs.find(c => c.id == m.tab.id);
      if (com) com.instance.onReceiveData(m.data);
    });
  }
}
