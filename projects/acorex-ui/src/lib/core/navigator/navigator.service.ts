import { Injectable } from '@angular/core';

export interface AXNavigatorParam {
    path: string,
    title?: string,
    data?: any
}

@Injectable()
export abstract class AXNavigator {
    abstract navigate(params: AXNavigatorParam);
    abstract popup(params: AXNavigatorParam);
}