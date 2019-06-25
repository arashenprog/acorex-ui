import * as moment_ from "jalali-moment";
const moment = moment_;

export class AXDateTime {
    private _moment: moment_.Moment;

    private _date: Date;
    get date(): Date {
        return this._date;
    }



    readonly dayInMonth: number;
    readonly dayInWeek: number;

    constructor(date: Date = new Date()) {
        this._date = date;
        this._moment = moment(date);
        this.dayInMonth = this._moment.date();
        this.dayInWeek = this._moment.day();
    }


    get month(): AXCalendarMonth {
        return new AXCalendarMonth(this.date);
    }

    get firstDayOfWeek(): AXDateTime {
        return new AXDateTime(moment(this.date).startOf('w').toDate());
    }

    get endDayOfWeek(): AXDateTime {
        return new AXDateTime(moment(this.date).endOf('w').toDate());
    }


    addDay(amount: number): AXDateTime {
        return new AXDateTime(moment(this.date).add(amount, "d").toDate());
    }

    addMonth(amount: number): AXDateTime {
        return new AXDateTime(moment(this.date).add(amount, "months").toDate());
    }


    duration(end: AXDateTime): number {
        var date1 = new Date(this.date);
        var date2 = new Date(end.date);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    format(format: string): string {
        return this._moment.format(format);
    }

    toString(): string {
        return this.format("YYYY-mm-dd")
    }

    equal(value: AXDateTime, granularity: "day" | "month" | "year" = "day") {
        return this._moment.isSame(value.date, granularity);
    }

}


export class AXCalendarMonth {

    private _moment: moment_.Moment;
    constructor(date: Date) {
        this._moment = moment(date);
        this.index = date.getMonth();
        this.name = this._moment.format("MMMM");
        this._startDate = new AXDateTime(this._moment.startOf('month').toDate());
        this._endDate = new AXDateTime(this._moment.endOf('month').toDate());
    }

    private readonly index: number;
    private readonly name: string;

    private _startDate: AXDateTime;
    public get startDate(): AXDateTime {
        return this._startDate;
    }


    private _endDate: AXDateTime;
    public get endDate(): AXDateTime {
        return this._endDate;
    }
}

