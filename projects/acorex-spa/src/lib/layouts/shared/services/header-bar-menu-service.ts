import { MenuItem } from 'acorex-ui';
import { PromisResult } from 'acorex-ui';

export abstract class AXHeaderBarMenuService{
    abstract getItems():PromisResult<MenuItem[]>;
    abstract clickItem(item:MenuItem):PromisResult<boolean>;
}