import './dayDate.css';
import { selectedT } from './dayDate.tmp';
import engine from '../../../lib/engine/engine';

export default class DayDate {
    constructor(node) {
        this.container = node.firstElementChild;
        this.day = this.container.lastElementChild.textContent;
    }

    mark(direction) {
        const html = engine(selectedT(direction));
        this.container.insertAdjacentHTML('afterbegin', html);
        this.bg = this.container.querySelector('.selected');
    }

    removeBg() {
        this.bg.remove();
    }

    highlightCurrent() {
        this.container.classList.add('day-today');
    }
}
