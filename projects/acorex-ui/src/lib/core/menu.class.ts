export class BaseMenuItem {
  uid?:string=new Date().getTime().toString();
  id?: string;
  name?: string;
  text?: string;
  tooltip?: string;
  icon?: string;
  visible?: boolean = true;
  disable?: boolean = false;
  selected?: boolean = false;
  type?: string = "primary";
  groupName?:string;
  data?: any;
  style?:string;
}

export class MenuItem extends BaseMenuItem {
  items?: MenuItem[];
  parentId?: string;
  split?:boolean;
}

export class ButtonItem extends BaseMenuItem {
  dropdown?: boolean = false;
  submitBehavior?: boolean = false;
  cancelBehavior?: boolean = false;
}
export class CheckItem {
  text?: string;
  value?: any;
  selected?:boolean;
}