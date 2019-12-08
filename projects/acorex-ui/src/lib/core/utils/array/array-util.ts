import { AXDateTime, AXDateTimeRange } from "../../calendar/datetime";
import { fetchProp } from "../object/object-util";


export class ArrayUtil {

    /**
    * pick randoem element from array
    * @param array input array
    * @returns array's element
    */
    static pickRandom(array: any[]):any {
        return array[Math.floor(Math.random() * array.length)]
    }

    /**
    * contact array at specific index
    * @param array input array
    * @param index index of concat
    * @param rest array to concat
    * @returns array's element
    */
    static insert(array: any[], index, ...rest) {
        array.splice.apply(array, [index, 0].concat(Array.prototype.slice.call(rest, 1)));
        return array;
    }

    static range(min: number, max: number): number[] {
        return new Array(max - min).fill(1).map((d, i) => i)
    }

    static filter(array: any[], filters: any[]): any[] {
        if (filters == null || filters.length == 0)
            return array;
        const lamda = (item) => {
            let result: boolean = true;
            for (const key in filters) {
                if (filters.hasOwnProperty(key)) {
                    const f = filters[key];
                    ;
                    if (f != "AND") {
                        let vals = [];
                        let mt = f.field.match(/\[\:(.*?)\]/)
                        if (mt && mt.length > 1) {
                            let p1 = f.field.replace(mt[0], "");
                            let p2 = mt[1];
                            let prop = fetchProp(item, p1);
                            if (prop instanceof Array && prop.length) {
                                vals.push(...prop.map(m => (fetchProp(m, p2))));
                            }
                            else
                                result = false
                        }
                        else
                            vals.push(fetchProp(item, f.field));

                        for (const j in vals) {
                            if (vals.hasOwnProperty(j)) {
                                let v1 = vals[j];
                                let v2 = f.value;
                                if (f.dataType == "string") {
                                    v1 = v1.toString();
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
                                else if (f.dataType == "number") {
                                    v1 = Number(v1);
                                    ;
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
                                        case "less-than":
                                            {
                                                result = v1 < v2;
                                                break;
                                            }
                                        case "less-than-equal":
                                            {
                                                result = v1 <= v2;
                                                break;
                                            }
                                        case "greater-than":
                                            {
                                                result = v1 > v2;
                                                break;
                                            }
                                        case "greater-than-equal":
                                            {
                                                result = v1 >= v2;
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
                                else {
                                    console.error("The datatype is not supported")
                                    result = false;
                                }

                                if (result)
                                    break;
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


        return array.filter(lamda);
    }

}


// Array.prototype.pickRandom = function (): any {
//     return this[Math.floor(Math.random() * this.length)]
// }

// Array.prototype.insert = function (index, ...rest) {
//     this.splice.apply(this, [index, 0].concat(
//         Array.prototype.slice.call(rest, 1)));
//     return this;
// };


// Array.prototype.range = function (min: number, max: number): number[] {
//     return new Array(max - min).fill(1).map((d, i) => i)
// }
// Array.prototype.query = function (filters: any[]): any[] {

// }






