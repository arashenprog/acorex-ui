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
        return (<any>window).openDatabase('mydb', '1.0', 'FormBuilder', 2 * 1024 * 1024);
    }

    constructor() {
        let db = this.getDb();
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Forms (code unique,title,data)');
        });
    }

    getList(): PromisResult<FormDTO[]> {
        return new PromisResult((resolve) => {
            let db = this.getDb();
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM Forms', [], function (tx, results) {
                    let len = results.rows.length, i, list: FormDTO[] = [];
                    for (i = 0; i < len; i++) {
                        let item = results.rows.item(i);
                        list.push({
                            code: item.code,
                            data: item.data,
                            title: item.title
                        })
                    }
                    resolve(list);
                });
            });
        });
    }

    saveForm(form: FormDTO): PromisResult<void> {
        return new PromisResult((resolve) => {
            let db = this.getDb();
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM Forms where code = ?', [form.code], function (tx, results) {
                    if (results.rows.length) {
                        tx.executeSql('UPDATE Forms SET  title = ? ,data= ? WHERE code = ?', [
                            form.title,
                            form.data,
                            form.code
                        ], function (tx, results) {
                            debugger;
                            resolve();
                        }, function errorHandler(transaction, error) {
                            debugger;
                        });
                    }
                    else {
                        tx.executeSql('INSERT INTO Forms (code, title,data) VALUES (?, ?,?)', [
                            form.code,
                            form.title,
                            form.data
                        ], function (tx, results) {
                            debugger;
                            resolve();
                        }, function errorHandler(transaction, error) {
                            debugger;
                        });
                    }
                });

            });
        });
    }

    deleteForm(code: string): PromisResult<void> {
        return new PromisResult((resolve) => {
            let db = this.getDb();
            db.transaction(function (tx) {
                tx.executeSql('DELETE from Forms  WHERE code=?', [
                    code
                ], function (tx, results) {
                    resolve();
                });
            });
        });
    }

    loadForm(code: string): PromisResult<FormDTO> {
        return new PromisResult((resolve) => {
            let db = this.getDb();
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM Forms where code = ?', [code], function (tx, results) {
                    debugger;
                    if (results.rows.length) {
                        let item = results.rows.item(0);
                        resolve({
                            code: item.code,
                            data: item.data,
                            title: item.title
                        });
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }

}