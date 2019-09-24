import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "html2text" })
export class AXHtmlToTextPipe implements PipeTransform {
  transform(value: string) {
    if (value) {
      let regexHtml = /<\/?[^>]+>/gi;
      let regexNbsp = /&nbsp;/gi;
      let regexAmp = /&amp;/gi;
      return value
        .replace(regexHtml, "")
        .replace(regexNbsp, "")
        .replace(regexAmp, "");
    } else {
      return "";
    }
  }
}
