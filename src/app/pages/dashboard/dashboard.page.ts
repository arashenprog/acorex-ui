import { Component, ViewChild } from "@angular/core";
import {
    AXBasePageComponent,
    IWidget,
    MenuItem,
    AXWidgetManagerComponent
} from "acorex-ui";

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
            visible: false,
        }
    ]

    ngOnInit(): void {
        if (localStorage.getItem("widgets")) {
            this.widgets = JSON.parse(localStorage.getItem("widgets"));
            console.log("widgets", this.widgets);
        }
    }

    widgets: IWidget[] = [];
   

    onWidgetChange(e) {
        localStorage.setItem("widgets", e.json)
        console.log("json", e);
    }

    onToolbarItemClick(e: MenuItem) {
        if (e.name == "edit") {
            this.manager.allowEdit(!this.manager.isInEditing);
            e.text = this.manager.isInEditing ? "Apply" : "Edit";
            e.icon = this.manager.isInEditing ? "fas fa-check" : "fas fa-pen";
            e.style = this.manager.isInEditing ? "text-success" : "text-primary";
            this.toolbarItems[1].visible = this.manager.isInEditing;
        }
        if (e.name == "add") {
            this.manager.open();
        }

    }
}