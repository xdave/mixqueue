import { State } from '../types';
import { createSelector } from 'reselect';
import { secondsToTime2 } from "../util/player";

export const getState = (state: State) => state.audio;
export const getCurrentTime = (state: State) => state.audio.currentTime;

export const getActiveMix = createSelector(
    getState,
    audio => audio.activeMixes[0]
);

export const getActiveTrack = createSelector(
    getState,
    audio => audio.activeTracks[0]
);
