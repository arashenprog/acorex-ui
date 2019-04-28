
import { Injectable } from "@angular/core";
declare var require: any;

export interface IThemeColor {
    id: number;
    name: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;
}

@Injectable()
export class ThemeService {

    private themes: IThemeColor[] = [
        {
            id: 1,
            name: "Blue",
            primary: "#2774cc",
            primaryDark: "#0042A3",
            primaryLight: "#2B82E5",
            secondary: "#0042A3",
            secondaryLight: "#565656",
            secondaryDark: "#2B2B2B",
        },
        {
            id: 2,
            name: "Red",
            primary: "#ED213A",
            primaryDark: "#93291E",
            primaryLight: "#2B82E5",
            secondary: "#0042A3",
            secondaryLight: "#565656",
            secondaryDark: "#2B2B2B",
        },
        {
            id: 3,
            name: "Purple",
            primary: "#9575cd",
            primaryDark: "#512da8",
            primaryLight: "#2B82E5",
            secondary: "#0042A3",
            secondaryLight: "#565656",
            secondaryDark: "#2B2B2B",
        },
        {
            id: 4,
            name: "Orange",
            primary: "#f5af19",
            primaryDark: "#f12711",
            primaryLight: "#2B82E5",
            secondary: "#0042A3",
            secondaryLight: "#565656",
            secondaryDark: "#2B2B2B",
        },
        {
            id: 5,
            name: "Green",
            primary: "#4caf50",
            primaryDark: "#388e3c",
            primaryLight: "#2B82E5",
            secondary: "#0042A3",
            secondaryLight: "#565656",
            secondaryDark: "#2B2B2B",
        },
        {
            id: 6,
            name: "LightBlue",
            primary: "#4fc3f7",
            primaryDark: "#03a9f4",
            primaryLight: "#2B82E5",
            secondary: "#0042A3",
            secondaryLight: "#565656",
            secondaryDark: "#2B2B2B",
        },
    ]


    defaultTheme() {
        require("style-loader!../assets/scss/themes/base/master.ltr.scss");

    }

    defaultRtlTheme() {
        require("style-loader!../assets/scss/themes/base/master.rtl.scss");
    }


    getList(): IThemeColor[] {
        return this.themes;
    }

    getCurrent(): IThemeColor {
        const t = localStorage.getItem("THEME");
        const f = this.themes.find(c => c.name == t);
        return f ? f : this.themes.find(c => c.id == 1);
    }


    loadTheme() {
        const t = localStorage.getItem("THEME");
        this.setTheme(t, false);
    }

    setTheme(name: string, reload: boolean = true) {
        switch (name) {
            case "Red":
                require("style-loader!../assets/scss/themes/Red/red.rtl.scss");
                break;
            case "Blue":
                require("style-loader!../assets/scss/themes/base/master.rtl.scss");
                break;
            case "LightBlue":
                require("style-loader!../assets/scss/themes/lightBlue/lightblue.rtl.scss");
                break;
            case "Green":
                require("style-loader!../assets/scss/themes/green/green.rtl.scss");
                break;
            case "Orange":
                require("style-loader!../assets/scss/themes/orange/orange.rtl.scss");
                break;
            case "Purple":
                require("style-loader!../assets/scss/themes/purple/purple.rtl.scss");
                break;
            default:
                require("style-loader!../assets/scss/themes/base/master.rtl.scss");
                break;
        }
        localStorage.setItem("THEME", name);
        if (reload)
            window.location.reload();
    }
}