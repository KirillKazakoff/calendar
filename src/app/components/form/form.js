import './form.css';

export default class Form {
    constructor() {
        this.container = document.querySelector('.form');
        this.directionToggler = this.container.querySelector('.checkbox-elem');

        this.toggler = false;
        this.goto = this.container.querySelector('.result__goto');
        this.back = this.container.querySelector('.result__back');
    }

    toggle() {
        this.directionToggler.firstElementChild.classList.toggle('hidden');
        this.toggler = !this.toggler;

        if (!this.toggler) {
            this.hideBack();
            const output = this.back.querySelector('.output');
            output.textContent = 'Введите дату';
            return true;
        }

        this.showBack();
        return false;
    }

    showBack() {
        this.back.classList.remove('hidden');
        this.goto.style.width = '50%';
    }

    hideBack() {
        this.back.classList.add('hidden');
        this.goto.style.width = '100%';
    }

    showDate(clickRes) {
        if (!clickRes) return;

        const { date, direction } = clickRes;
        const output = this[direction].querySelector('.output');

        if (date) {
            output.textContent = date.output;
            return;
        }

        output.textContent = 'Введите дату';
    }
}
