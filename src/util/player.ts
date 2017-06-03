import * as musicActions from '../actions/music';

export const getXFromPos = (el: HTMLElement | null, time: number, duration: number) => {
    if (el) {
        const { width } = el.getBoundingClientRect();
        return `${time / duration * (width - 1)}px`;
    }
    return '0px';
};

export const qXFromPos = (selector: string, time: number, duration: number) => {
    const el = document.querySelector(selector) as HTMLElement;
    return getXFromPos(el, time, duration);
};

export const getTimeFromX = (event: React.MouseEvent<HTMLDivElement>, duration: number) => {
    const div = event.currentTarget;
    const { left, width } = div.getBoundingClientRect();

    const x = event.clientX - left;
    const factor = x / width;
    return factor * duration;
}

export const setPosFromX = (duration: number, setTime: typeof musicActions.setTime) =>
    (event: React.MouseEvent<HTMLDivElement>) => {
        setTime({ time: getTimeFromX(event, duration) });
    };

export const secondsToTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds - (hrs * 3600)) / 60);
    const secs = totalSeconds - (hrs * 3600) - (mins * 60);
    const secsFixed = secs.toFixed(3);

    const hrsStr = hrs < 10 ? `0${hrs}` : hrs;
    const minsStr = mins < 10 ? `0${mins}` : mins;
    const secsStr = (secs < 10 ? `0${secsFixed}` : secsFixed);
    return `${hrsStr}:${minsStr}:${secsStr}`;
};

export const secondsToTime2 = (totalSeconds: number) =>
    secondsToTime(totalSeconds).replace(/\.[0-9]*$/, '');


export const zeroPad = (num: number) =>
    num < 10 ? '0' + num : num;
