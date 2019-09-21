import * as moment_ from "jalali-moment";
const moment = moment_;

export type TimeUnit = "second" | "minute" | "minutes" | "hour" | "hours" | "day" | "days" | "month" | "year" | "week";

export type TimeDuration = "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years";

export class AXDateTime {


    private _date: Date;
    get date(): Date {
        return this._date;
    }


    private get _moment(): moment_.Moment {
        let m= moment(this.date);
        //m.locale("fa");
        return m;
    }

    constructor(value: Date | string = new Date()) {

        if (value instanceof Date) {
            this._date = (<Date>value);
        }
        else
            this._date = new Date(value);
        //
    }

    clone(): AXDateTime {
        return new AXDateTime(this.date);
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
        return new AXCalendarMonth(this.date);
    }

    get firstDayOfWeek(): AXDateTime {
        return new AXDateTime(moment(this.date).startOf('w').toDate());
    }

    get endDayOfWeek(): AXDateTime {
        return new AXDateTime(moment(this.date).endOf('w').toDate());
    }

    add(unit: TimeUnit = "day", amount: number): AXDateTime {
        return new AXDateTime(moment(this.date).add(amount, unit).toDate());
    }

    addDay(amount: number): AXDateTime {
        return new AXDateTime(moment(this.date).add(amount, "d").toDate());
    }

    addMonth(amount: number): AXDateTime {
        return new AXDateTime(moment(this.date).add(amount, "months").toDate());
    }

    set(unit: TimeUnit = "day", value: number): AXDateTime {
        this._date = this._moment.set(unit, value).toDate();
        return this;
    }


    duration(end: AXDateTime, unit: TimeDuration = "days"): number {
        let duration = moment.duration(this._moment.diff(end._moment));
        return Math.round(duration.as(unit));
    }

    startOf(unit: TimeUnit = "day"): AXDateTime {
        return new AXDateTime(moment(this.date).startOf(unit).toDate());
    }

    endOf(unit: TimeUnit = "day"): AXDateTime {
        return new AXDateTime(moment(this.date).endOf(unit).toDate());
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
        return this._moment.isSame(value.date, unit);
    }

    compaire(value: AXDateTime, unit: TimeUnit = "day") {
        if (this._moment.isBefore(value.date, unit))
            return -1;
        else if (this._moment.isAfter(value.date, unit))
            return 1;
        else
            return 0;
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