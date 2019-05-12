export class BaseMenuItem {
  id?: string;
  name?: string;
  text: string;
  icon?: string;
  visible?: boolean = true;
  disable?: boolean = false;
  type?: string = "primary";
  data?: any;
}

export class MenuItem extends BaseMenuItem {
  items?: MenuItem[];
  parentId?: string;
}

export class ButtonItem extends BaseMenuItem {
  dropdown?: boolean = false;
  submitBehavior?: boolean = false;
  cancelBehavior?: boolean = false;
}
export class CheckItem {
  text?: string;
  value?: boolean;
}