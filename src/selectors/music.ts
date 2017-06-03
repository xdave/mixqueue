import { State } from '../types';
// import { createSelector } from 'reselect';
import { getType } from "../util/fileType";

// const getState = (state: State) => state.music;

export const getPlayableUrl = (_: State, el: HTMLAudioElement, urls: string[]) =>
    urls.reduce((acc, cur) => (
        el.canPlayType(getType(acc)) === 'probably'
            ? acc
            : cur
    ), '');
