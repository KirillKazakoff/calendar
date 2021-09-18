import Widget from '../components/widget/widget';
import Form from '../components/form/form';

export default class Controller {
    constructor() {
        this.widget = new Widget();
        this.form = new Form(this.widget.backDate);

        this.form.directionToggler.addEventListener('click', () => this.onFormToggle());
        this.widget.container.addEventListener('click', (e) => this.onDateClick(e));
    }

    onFormToggle() {
        const toggleRes = this.form.toggle(this.widget.backDate);

        if (toggleRes) {
            if (this.widget.backDate) {
                this.widget.backDate.removeBg();
                this.widget.backDate = null;
            }
        }
    }

    onDateClick(e) {
        if (e.target.className.includes('day-number')) {
            const dayContainer = e.target.closest('.day-wrap');

            if (dayContainer.className.includes('now')) {
                const clickRes = this.widget.dateClick(dayContainer, this.form.toggler);
                this.form.showDate(clickRes);
            }
        }
    }
}
