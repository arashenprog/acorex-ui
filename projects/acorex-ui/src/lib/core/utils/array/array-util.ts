
declare global {
    export interface Array<T> {
        pickRandom(): T;
    }
}
Array.prototype.pickRandom = function (): any {
    return this[Math.floor(Math.random() * this.length)]
}



export {};