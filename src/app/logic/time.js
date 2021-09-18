/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { DateTime } from 'luxon';

export default class Time {
    constructor() {
        this.current = DateTime.now();

        this.dateInit = {
            ms: this.current.toMillis(),
            day: this.current.day,
            month: this.current.month,
            year: this.current.year,
        };

        this.data = {
            dateStr: null,
            dayData: {
                oldStart: null,
                oldEnd: null,
                dayAmount: null,
            },
        };

        this.getData();
    }

    getDateString() {
        return this.current.toLocaleString({
            year: 'numeric',
            month: 'long',
        });
    }

    getPreviousData() {
        this.current = this.current.minus({ months: 1 });

        const lastWeekday = this.current.endOf('month').weekday;
        const dayAmount = this.current.daysInMonth;
        const { dayData } = this.data;

        dayData.oldEnd = dayAmount;
        dayData.oldStart = dayAmount - lastWeekday + 1;

        this.current = this.current.plus({ month: 1 });
    }

    getCurrentData() {
        this.data.dayData.dayAmount = this.current.daysInMonth;
        this.data.dateStr = this.getDateString();
    }

    getData() {
        this.getCurrentData();
        this.getPreviousData();
    }

    plusMonth() {
        this.current = this.current.plus({ month: 1 });
        this.getData();
    }

    minusMonth() {
        if (this.current.month === this.dateInit.month) {
            console.log('it is past date bruh');
            return;
        }
        this.current = this.current.minus({ months: 1 });
        this.getData();
    }

    checkInitDate() {
        if (this.current.toMillis() === this.dateInit.ms) {
            return this.dateInit;
        }
        return false;
    }

    setMs(dayNode) {
        const dtDay = DateTime.fromObject({
            day: dayNode.day,
            month: this.current.month,
            year: this.current.year,
        });
        dayNode.output = dtDay.toLocaleString({
            year: '2-digit',
            day: '2-digit',
            month: '2-digit',
        });

        dayNode.dayMs = dtDay.toMillis();

        const dtMonth = DateTime.fromObject({
            month: this.current.month,
            year: this.current.year,
        });
        dayNode.monthMs = dtMonth.endOf('month').toMillis();
    }

    getMonthEnd() {
        return this.current.endOf('month').toMillis();
    }
}
