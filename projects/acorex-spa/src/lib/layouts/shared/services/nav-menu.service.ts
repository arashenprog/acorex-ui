import { MenuItem } from 'acorex-ui';
import { PromisResult } from 'acorex-ui';

export abstract class AXNavMenuService{
    abstract getItems():PromisResult<MenuItem[]>;
    abstract getFavorites():PromisResult<MenuItem[]>;

    abstract setFavorites(menu:MenuItem,value:boolean):PromisResult<boolean>;
    abstract serach(text:string):PromisResult<MenuItem[]>;
    abstract clickItem(item:MenuItem):PromisResult<boolean>;
}