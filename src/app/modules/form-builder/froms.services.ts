import { Injectable } from '@angular/core';
import { PromisResult } from 'acorex-ui';

export interface FormDTO {
    code: string;
    title: string;
    data: string
}

@Injectable()
export class FormsService {

    private getDb() {
        return (<any> window).openDatabase('mydb', '1.0', 'FormBuilder', 2 * 1024 * 1024);
    }

    constructor() {
        let db = this.getDb();
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Forms (id unique, code,title,data)');
        });
    }

    getList(): PromisResult<FormDTO[]> {
        return new PromisResult((resolve) => {
            let db = this.getDb();
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM Forms', [], function (tx, results) {
                    let len = results.rows.length, i, list: FormDTO[];
                    for (i = 0; i < len; i++) {
                        resolve(list);
                    }
                });
            });
        });
    }

    saveForm(form: FormDTO):PromisResult<void> {
        return new PromisResult((resolve) => {
            let db = this.getDb();
            debugger
            db.transaction(function (tx) {
                tx.executeSql('INSERT INTO Forms (code, title,data) VALUES (?, ?,?)', [
                    form.code,
                    form.title,
                    form.data
                ], function (tx, results) {
                    resolve();
                });
            });
        });
    }

    loadForm(code: string): FormDTO {
        return null;
    }

}