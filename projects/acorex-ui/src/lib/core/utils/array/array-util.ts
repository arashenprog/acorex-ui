import { AXDateTime, AXDateTimeRange } from "../../calendar/datetime";

declare global {
    export interface Array<T> {
        pickRandom(): T;
        query(filters: any[]): T[];
    }


}
Array.prototype.pickRandom = function (): any {
    return this[Math.floor(Math.random() * this.length)]
}
Array.prototype.query = function (filters: any[]): any[] {
    if (filters == null || filters.length == 0)
        return this;
    const lamda = (item) => {
        let result: boolean = true;
        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                const f = filters[key];
                if (f != "AND") {
                    let v1 = item[f.field];
                    let v2 = f.value;
                    if (f.dataType == "string") {
                        switch (f.condition) {
                            case "equal":
                                {
                                    result = (v1 && v2) && v1.toLowerCase() == v2.toLowerCase();
                                    break;
                                }
                            case "not-equal":
                                {
                                    result = !((v1 && v2) && v1.toLowerCase() == v2.toLowerCase());
                                    break;
                                }
                            case "contains":
                                {
                                    result = ((v1 && v2) && (v1.toLowerCase().includes(v2.toLowerCase())));
                                    break;
                                }
                            case "not-contains":
                                {
                                    result = !((v1 && v2) && (v1.toLowerCase().includes(v2.toLowerCase())));
                                    break;
                                }
                            case "start-with":
                                {
                                    result = ((v1 && v2) && (v1.toLowerCase().startsWith(v2.toLowerCase())));
                                    break;
                                }
                            case "end-with":
                                {
                                    result = ((v1 && v2) && (v1.toLowerCase().endsWith(v2.toLowerCase())));
                                    break;
                                }
                            case "is-empty":
                                {
                                    result = v1 == null || v1 == undefined;
                                    break;
                                }
                            case "is-not-empty":
                                {
                                    result = !(v1 == null || v1 == undefined);
                                    break;
                                }
                            default:
                                console.error("The condition is not defined")
                                result = false;
                        }
                    }
                    else if (f.dataType == "date") {
                        switch (f.condition) {
                            case "equal":
                                {
                                    result = (v1 && v2) && (v1 as AXDateTime).equal(v2, "day");
                                    break;
                                }
                            case "between":
                                {
                                    result = (v1 && v2) && new AXDateTimeRange(v2[0], v2[1]).includes(v1);
                                    break;
                                }
                        }
                    }
                    else {
                        switch (f.condition) {
                            case "equal":
                                {
                                    result = v1 == v2;
                                    break;
                                }
                            case "not-equal":
                                {
                                    result = v1 != v2;
                                    break;
                                }
                            case "contains":
                                {
                                    result = v2 && v2 instanceof Array && v2.includes(v1);
                                    break;
                                }
                            default:
                                console.error("The condition is not defined")
                                result = false;
                        }
                    }

                }
                //
                if (!result)
                    return false;
            }
        }
        return true;
    }


    return this.filter(lamda);
}






export { };