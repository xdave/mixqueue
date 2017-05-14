import { State } from '../types';
import { createSelector } from 'reselect';

export const getState = (state: State) => state.audio;
export const getCurrentTime = (state: State) => state.audio.currentTime;

export const getMixes = createSelector(
    getState,
    audio => audio.mixes
        .slice()
        .map(m => ({ m, d: Date.parse(m.date) }))
        .sort((a, b) =>
            (a.d < b.d)
                ? 1
                : (a.d > b.d)
                    ? -1
                    : 0)
        .map(o => o.m)
);

export const getActiveMix = createSelector(
    getState,
    audio => audio.activeMixes[0]
);

export const getActiveTrack = createSelector(
    getState,
    audio => audio.activeTracks[0]
);
