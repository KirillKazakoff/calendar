import { dayGen } from './date/dayDate.tmp';

// header Template
const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const weekDayT = (day) => ({
    block: 'div',
    cls: 'weekday',
    content: day,
});

const headerWeekdaysT = () => ({
    block: 'div',
    cls: 'header__weekdays',
    content: days.map(weekDayT),
});

const arrowT = (position, content) => ({
    block: 'div',
    cls: `arrow arrow-${position}`,
    content,
});

const headerMonthT = (data) => ({
    block: 'div',
    cls: 'header__month',
    content: data,
});

const headerMonthContainerT = (data) => ({
    block: 'div',
    cls: 'header__month__container',
    content: [arrowT('left', '<'), headerMonthT(data), arrowT('right', '>')],
});

const headerT = (data) => ({
    block: 'div',
    cls: 'widget__header',
    content: [headerMonthContainerT(data), headerWeekdaysT()],
});

// content
const contentT = (dayData) => ({
    block: 'div',
    cls: 'widget__content',
    content: dayGen(dayData),
});

// widget
const widgetT = (data) => ({
    block: 'div',
    cls: 'widget',
    content: [headerT(data.dateStr), contentT(data.dayData)],
});

export default widgetT;
