import { Component, ViewChild } from "@angular/core";
import {
    AXBasePageComponent,
    IWidget,
    MenuItem,
    AXWidgetManagerComponent
} from "@acorex/acorex-ui";

@Component({
    templateUrl: "./dashboard.page.html"
})
export class DashboardPage extends AXBasePageComponent {
    constructor() {
        super();
    }

    @ViewChild("manager") manager: AXWidgetManagerComponent;

    toolbarItems: MenuItem[] = [
        {
            name: "edit",
            text: "Edit",
            style: "text-primary",
            icon: "fas fa-pen",
           

        },
        {
            name: "add",
            text: "Add",
            style: "text-primary-light",
            icon: "fas fa-plus",
            visible:false,
        }
    ]

    widgets: IWidget[] = [
        {
            name: 'AXDateWidgetComponent',
        },
        {
            name: 'AXNoteWidgetComponent',
        },
    ]

    onToolbarItemClick(e: MenuItem) {
        if (e.name == "edit") {
            this.manager.allowEdit(!this.manager.isInEditing);
            e.text = this.manager.isInEditing ? "Save" : "Edit";
            e.style = this.manager.isInEditing ? "text-success" : "text-primary";
            this.toolbarItems[1].visible=this.manager.isInEditing;
        }
        if (e.name == "add") {
            this.manager.open();
        }

    }
}