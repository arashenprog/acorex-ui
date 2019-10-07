import {
    Component,
    ElementRef,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import { AXBasePageComponent, IWidget, AXDateWidgetComponent, AXNoteWidgetComponent, AXWidgetManagerComponent, AXWidgetService, MenuItem, AXToolbarMenuComponent } from "acorex-ui";

@Component({
    templateUrl: "./widgets.page.html"
})
export class WidgetsPage extends AXBasePageComponent {

    constructor(widgetService:AXWidgetService) {
        super();
        widgetService.register(AXNoteWidgetComponent.define)
        widgetService.register(AXDateWidgetComponent.define)
    }

    @ViewChild("manager") manager: AXWidgetManagerComponent;
    @ViewChild("toolbar") toolbar: AXToolbarMenuComponent;


    toolbarItems: MenuItem[] = [
        {
            name: "edit",
            text: "Edit",
            icon: "fas fa-pen",
        },
        {
            name: "add",
            text: "Add",
            icon: "fas fa-plus",
            visible: false,
        }
    ]

    ngOnInit(): void {
        if (localStorage.getItem("widgets")) {
            this.widgets = JSON.parse(localStorage.getItem("widgets"));
        }
    }

    widgets: IWidget[] = [];
   

    onWidgetChange(e) {
        localStorage.setItem("widgets", e.json)
    }

    onToolbarItemClick(e: MenuItem) {
        if (e.name == "edit") {
            this.manager.allowEdit(!this.manager.isInEditing);
            e.text = this.manager.isInEditing ? "Apply" : "Edit";
            e.icon = this.manager.isInEditing ? "fas fa-check" : "fas fa-pen";
            this.toolbarItems[1].visible = this.manager.isInEditing;
            this.toolbar.update();
        }
        if (e.name == "add") {
            this.manager.open();
        }

    }
}
