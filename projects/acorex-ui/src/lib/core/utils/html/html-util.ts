export type AXPlacement =
  | "top-start"
  | "top-middle"
  | "top-end"
  | "center-start"
  | "center-end"
  | "bottom-start"
  | "bottom-middle"
  | "bottom-end"

export interface AXIPoint {
  x: number;
  y: number;
}

export class AXPoint implements AXIPoint {
  constructor(public x: number, public y: number) {
  }
}

export interface AXIClientRec {
  left: number;
  top: number;
  width: number;
  height: number;
}
export class AXClientRec implements AXIClientRec {
  constructor(public left: number, public top: number, public width: number, public height: number) {

  }
}

export class AXHtmlUtil {
  static getBoundingRectPoint(el: HTMLElement, placement: AXPlacement): AXPoint {
    let rec = el.getBoundingClientRect();
    let width = el.offsetWidth;
    let height = el.offsetHeight;
    switch (placement) {
      case "top-start":
        return new AXPoint(rec.left, rec.top);
      case "top-middle":
        return new AXPoint(rec.left + (width / 2), rec.top);
      case "top-end":
        return new AXPoint(rec.left + (width), rec.top);
      case "center-end":
        return new AXPoint(rec.left + (width), rec.top + (height / 2));
      case "bottom-end":
        return new AXPoint(rec.left + (width), rec.top + (height));
      case "bottom-middle":
        return new AXPoint(rec.left + (width / 2), rec.top + (height));
      case "bottom-start":
        return new AXPoint(rec.left, rec.top + (height));
      case "center-start":
        return new AXPoint(rec.left, rec.top + (height / 2));
      default:
        return new AXPoint(rec.left + (width / 2), rec.top + (height));
    }
  }

  static isInRecPoint(pos: AXIPoint, rec: AXIClientRec): boolean {
    return pos.x >= rec.left && pos.x <= (rec.left + rec.width) && pos.y >= rec.top && (pos.y <= (rec.top + rec.height));
  }

  static getUID(): string {
    return "el-" + new Date().getDate().toString();
  }
}