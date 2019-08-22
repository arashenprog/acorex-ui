import { MenuItem, PromisResult } from 'acorex-ui';

export abstract class AXNavMenuService {
    abstract register(items: MenuItem[]): void;
    abstract getItems(): PromisResult<MenuItem[]>;
    abstract getFavorites(): PromisResult<MenuItem[]>;

    abstract setFavorites(menu: MenuItem, value: boolean): PromisResult<boolean>;
    abstract search(text: string): PromisResult<MenuItem[]>;
    abstract clickItem(item: MenuItem): PromisResult<boolean>;
}