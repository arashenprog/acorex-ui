
export interface IValidationRuleResult {
  message?: string;
  result: boolean;
  target?: any;
}

export interface IValidationResult {
  result: boolean;
  items?:IValidationRuleResult[];
}
