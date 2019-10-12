import { Injectable, Pipe, PipeTransform } from "@angular/core";


export type Lang = "fa" | "en";

@Injectable({providedIn:"root"})
export class TranslateService {

    private data_en: any[] = [
        { "Apply": "Apply" },
        { "Close": "Close" },
        {"LOGO_TITLE" : "Smart Co."}
    ]

    private data_fa: any[] = [
        { "Apply": "اعمال" },
        { "Close": "بستن" },
        {"LOGO_TITLE" : "هوشمند تصمیم آریا"}
    ]
    private lang: Lang = "en";

    constructor() {
    }

    public setLang(lang: Lang) {
        this.lang = lang;
    }

    public instant(key: string, lang?: Lang): string {
        const lng = lang || this.lang;
        const f = this["data_" + lng].find(c => c[key] != null)
        return f ? f[key] : key;
    }

}


@Pipe({ name: "lng" })
export class TranslatePipe implements PipeTransform {
    constructor(private translate: TranslateService) { }

    transform(value: string, lang?: Lang): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (!value) resolve(value);
            resolve(this.translate.instant(value, lang));
        })

    }
}
