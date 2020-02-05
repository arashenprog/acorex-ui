import * as moment_ from "jalali-moment";
const moment = moment_;

export type TimeUnit = "second" | "minute" | "minutes" | "hour" | "hours" | "day" | "days" | "month" | "year" | "week";

export type TimeDuration = "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years";

export type CalendarType = "jalali" | "gregorian";

export class AXDateTime {


    static convert(value: any, type: CalendarType = "gregorian"): AXDateTime {
        let date: AXDateTime;
        if (typeof value === "string" || value instanceof String) {
            date = new AXDateTime(<string>value, type);
        }
        else if (value instanceof Date) {
            date = new AXDateTime(<Date>value, type);
        }
        else if (value instanceof AXDateTime) {
            date = value
        }
        return date;
    }


    private _date: Date;
    get date(): Date {
        return this._date;
    }



    private resolveUnit(unit: TimeUnit): any {
        return this.type == "jalali" ? "j" + unit : unit;
    }


    private get _moment(): moment_.Moment {
        let m = moment(this.date);
        if (this.type == "jalali")
            m.locale("fa");
        return m;
    }

    constructor(value: Date | string = new Date(), public type: CalendarType = "gregorian") {

        if (value instanceof Date) {
            this._date = (<Date>value);
        }
        else
            this._date = new Date(value);
        //
    }

    clone(): AXDateTime {
        return new AXDateTime(this.date, this.type);
    }


    get dayInMonth(): number {
        return this._moment.date();
    }

    get dayOfYear(): number {
        return this._moment.dayOfYear();
    }

    get dayInWeek(): number {
        return this._moment.day();
    }




    get hour(): number {
        return this._moment.hour();
    }

    get minute(): number {
        return this._moment.minute();
    }

    get second(): number {
        return this._moment.second();
    }

    get year(): number {
        return this._moment.year();
    }

    get monthOfYear(): number {
        return this._moment.month();
    }


    get month(): AXCalendarMonth {
        return new AXCalendarMonth(this);
    }

    get firstDayOfWeek(): AXDateTime {
        return new AXDateTime(moment(this.date).startOf('w').toDate(), this.type);
    }

    get endDayOfWeek(): AXDateTime {
        return new AXDateTime(moment(this.date).endOf('w').toDate(), this.type);
    }

    add(unit: TimeUnit = "day", amount: number): AXDateTime {
        return new AXDateTime(moment(this.date).add(amount, this.resolveUnit(unit)).toDate(), this.type);
    }

    addDay(amount: number): AXDateTime {
        return new AXDateTime(moment(this.date).add(amount, "d").toDate(), this.type);
    }

    addMonth(amount: number): AXDateTime {
        return new AXDateTime(moment(this.date).add(amount, "months").toDate(), this.type);
    }

    set(unit: TimeUnit = "day", value: number): AXDateTime {
        return new AXDateTime(this._moment.set(unit, value).toDate(), this.type);
    }


    duration(end: AXDateTime, unit: TimeDuration = "days"): number {
        let duration = moment.duration(this._moment.diff(end._moment));
        return Math.round(duration.as(unit));
    }

    startOf(unit: TimeUnit = "day"): AXDateTime {
        return new AXDateTime(moment(this.date).startOf(this.resolveUnit(unit)).toDate(), this.type);
    }

    endOf(unit: TimeUnit = "day"): AXDateTime {
        return new AXDateTime(moment(this.date).endOf(this.resolveUnit(unit)).toDate(), this.type);
    }

    format(format: string): string {
        if (format == "P")
            return this._moment.fromNow();
        return this._moment.format(format);
    }

    toString(): string {
        return this.format("YYYY-MM-DD")
    }

    equal(value: AXDateTime, unit: TimeUnit = "day") {
        if (!value)
            return false;
        return this._moment.isSame(moment(value.date), this.resolveUnit(unit));
    }

    compaire(value: AXDateTime, unit: TimeUnit = "day") {
        // if (this._moment.isBefore(moment(value.date), this.resolveUnit(unit)))
        //     return -1;
        // else if (this._moment.isAfter(moment(value.date), this.resolveUnit(unit)))
        //     return 1;
        // else
        //     return 0;

        if (this._moment.isSame(moment(value.date), this.resolveUnit(unit)))
            return 0;
        else if (this._moment.isAfter(moment(value.date), this.resolveUnit(unit)))
            return 1;
        else
            return -1;
    }

    toISOString() {
        return this._date.toISOString();
    }

}


export class AXCalendarMonth {

    private _moment: moment_.Moment;

    private _range: AXDateTimeRange;
    public get range(): AXDateTimeRange {
        return this._range;
    }
    public set range(v: AXDateTimeRange) {
        this._range = v;
    }


    constructor(date: AXDateTime) {
        this._moment = moment(date.date);
        this.index = date.date.getMonth();
        this.name = this._moment.format("MMMM");
        this.range = new AXDateTimeRange(
            new AXDateTime(this._moment.startOf('month').toDate(), date.type),
            new AXDateTime(this._moment.endOf('month').toDate(), date.type)
        );
        //this._startDate = new AXDateTime(this._moment.startOf('month').toDate(), date.type);
        //this._endDate = new AXDateTime(this._moment.endOf('month').toDate(), date.type);
    }

    private readonly index: number;
    private readonly name: string;

    // private _startDate: AXDateTime;
    // public get startDate(): AXDateTime {
    //     return this._startDate;
    // }


    // private _endDate: AXDateTime;
    // public get endDate(): AXDateTime {
    //     return this._endDate;
    // }
}

export class AXDateTimeRange {
    constructor(public startTime: AXDateTime, public endTime: AXDateTime) {

    }

    duration(unit: TimeDuration = "days"): number {
        let duration = moment.duration(moment(this.startTime.date).diff(moment(this.endTime.date)));
        return duration.as(unit);
        //return Math.round(duration.as(unit));
    }

    enumurate(unit: TimeUnit = "day"): AXDateTime[] {
        let result: AXDateTime[] = [];
        for (let index = 0; this.startTime.add(unit, index).compaire(this.endTime, unit) <= 0; index++) {
            result.push(this.startTime.add(unit, index))
        }
        return result;
    }

    includes(value: AXDateTime, unit: TimeUnit = "day"): boolean {
        return value.compaire(this.startTime, unit) >= 0 && value.compaire(this.endTime, unit) <= 0;
    }



}