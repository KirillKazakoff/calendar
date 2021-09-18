const dayContainerT = (dayNumber) => ({
    block: 'div',
    cls: 'day-number-container',
    content: {
        block: 'div',
        cls: 'day-number',
        content: String(dayNumber),
    },
});

const dayWrapperNowT = (dayNumber) => ({
    block: 'div',
    cls: 'day-wrap day-wrap__now',
    content: dayContainerT(dayNumber),
    attrs: {
        id: dayNumber,
    },
});

const dayWrapperPreviousT = (dayNumber) => ({
    block: 'div',
    cls: 'day-wrap day-wrap__previous',
    content: dayContainerT(dayNumber),
    attrs: {
        id: dayNumber,
    },
});

const dayGen = (dayData) => {
    const { dayAmount, oldStart, oldEnd } = dayData;
    const days = [];

    if (oldEnd - oldStart < 6) {
        for (let i = oldStart; i <= oldEnd; i += 1) {
            days.push(dayWrapperPreviousT(i));
        }
    }

    for (let i = 1; i <= dayAmount; i += 1) {
        days.push(dayWrapperNowT(i));
    }

    return days;
};

// day selected
const selectedT = (cls) => ({
    block: 'div',
    cls: `selected selected__${cls}`,
    content: '',
});

export { dayGen, selectedT };
