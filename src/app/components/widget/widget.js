import './widget.css';
import engine from '../../lib/engine/engine';
import widgetT from './widget.tmp';
import Time from '../../logic/time';
import DayDate from './date/dayDate';

export default class Widget {
    constructor() {
        this.container = document.body;
        this.time = new Time();

        this.goToDate = null;
        this.backDate = null;

        this.render();

        this.container.addEventListener('click', (e) => this.onArrowClick(e));
    }

    render() {
        if (this.node) {
            this.node.remove();
            this.node = null;
        }

        const html = engine(widgetT(this.time.data));
        this.container.insertAdjacentHTML('beforeend', html);
        this.node = this.container.querySelector('.widget');

        this.highlightCurrent();
        this.highlightPrevious();
    }

    onArrowClick(e) {
        if (e.target.className.includes('arrow')) {
            if (e.target.className.includes('arrow-right')) {
                this.time.plusMonth();
            }
            if (e.target.className.includes('arrow-left')) {
                this.time.minusMonth();
            }
            this.time.checkInitDate();
            this.render();
        }
    }

    highlightCurrent() {
        const initDate = this.time.checkInitDate();

        if (initDate) {
            const dayNode = this.node.querySelector(`.day-wrap[id="${initDate.day}"]`);
            this.dayInit = new DayDate(dayNode);
            this.dayInit.highlightCurrent();
            this.time.setMs(this.dayInit);
        } else {
            this.dayInit = null;
        }
    }

    highlightPrevious() {
        if (this.goToDate) {
            if (this.goToDate.monthMs === this.time.getMonthEnd()) {
                const dayNode = this.node.querySelector(`.day-wrap[id="${this.goToDate.day}"]`);
                this.goToDate = new DayDate(dayNode);

                this.time.setMs(this.goToDate);
                this.goToDate.mark('goto');
            }
        }
        if (this.backDate) {
            if (this.backDate.monthMs === this.time.getMonthEnd()) {
                const dayNode = this.node.querySelector(`.day-wrap[id="${this.backDate.day}"]`);
                this.backDate = new DayDate(dayNode);

                this.time.setMs(this.backDate);
                this.backDate.mark('back');
            }
        }
    }

    static returnDate(date, direction) {
        return { date, direction };
    }

    dateClick(date, toggler) {
        const dayDate = new DayDate(date, this.time.data.dateStr);
        this.time.setMs(dayDate);

        if (this.dayInit) {
            if (this.dayInit.dayMs > dayDate.dayMs) {
                console.log('Вы не можете отправиться в прошлое');
                return false;
            }
        }

        if (!this.goToDate) {
            this.goToDate = dayDate;
            this.goToDate.mark('goto');
            return Widget.returnDate(this.goToDate, 'goto');
        }

        if (this.backDate && (dayDate.dayMs === this.goToDate.dayMs)) {
            console.log('Вы не можете ввести ту же дату обратно, что и туда. Так задумали разработчики');
            return false;
        }

        if (this.goToDate.day === dayDate.day) {
            this.goToDate.removeBg();
            this.goToDate = null;
            return Widget.returnDate(this.goToDate, 'goto');
        }

        if (!toggler) {
            this.goToDate.removeBg();
            this.goToDate = dayDate;
            this.goToDate.mark('goto');
            return Widget.returnDate(this.goToDate, 'goto');
        }

        if (dayDate.dayMs < this.goToDate.dayMs) {
            console.log('Вы пытаетесь ввести дату обратно раньше даты туда. Совсем crazy?');
            return false;
        }

        if (!this.backDate) {
            this.backDate = dayDate;
            this.backDate.mark('back');
            return Widget.returnDate(this.backDate, 'back');
        }

        if (this.backDate.day === dayDate.day) {
            this.backDate.removeBg();
            this.backDate = null;
            return Widget.returnDate(this.backDate, 'back');
        }

        this.backDate.removeBg();
        this.backDate = dayDate;
        this.backDate.mark('back');
        return Widget.returnDate(this.backDate, 'back');
    }
}
