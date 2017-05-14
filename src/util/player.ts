import { MixFile, Track } from "../types/index";
import * as audioActions from '../actions/audio';

export const getAudioSources = (files: MixFile[], mixId: string) =>
    files
        .filter(f => [/ogg/i, /mp3/i].some(r => r.test(f.format)))
        .slice()
        .sort(a => (/ogg/i).test(a.format) ? -1 : 1)
        .map(f => `https://archive.org/download/${mixId}/${f.name}`);

export const getPeaksImage = (files: MixFile[], mixId: string) =>
    files
        .filter(f => /png/i.test(f.format))
        .map(f => `https://archive.org/download/${mixId}/${f.name}`)[0]
        || '';

export const getXFromPos = (el: HTMLElement, currentTime: number, duration: number) => {
    if (el) {
        const { width } = el.getBoundingClientRect();
        return `${currentTime / duration * (width - 1)}px`;
    }
    return '0px';
};

export const setPosFromX = (duration: number, setTime: typeof audioActions.setCurrentTime) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
        const div = e.currentTarget;
        const { width } = div.getBoundingClientRect();

        const x = e.clientX - div.getBoundingClientRect().left;
        const factor = x / width;
        const time = factor * duration;
        setTime(time);
    };

export const getTrackLen = (track: Track, tracks: Track[], duration: number) => {
    const next: Track | undefined = tracks[track.number];
    const nt = next ? next.time : duration;
    return nt - track.time;
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

export const zeroPad = (num: number) =>
    num < 10 ? '0' + num : num;
