import { ThunkAction } from 'redux-thunk'
import { State } from '../types';
import { AudioControl } from "../util/audio";
import { getType } from "../util/fileType";

export type AudioAction
    = { type: 'AUDIO_SET_CONTROL', control: () => AudioControl }
    | { type: 'AUDIO_SET_DURATION_DONE', duration: number }
    | { type: 'AUDIO_SEEK_START' }
    | { type: 'AUDIO_SEEK_END', position: number }
    | { type: 'AUDIO_SET_SOURCE_DONE', source: string }
    | { type: 'AUDIO_SET_CURRENT_TIME_DONE', currentTime: number }
    | { type: 'AUDIO_SET_PLAYING_DONE', playing: boolean }
    | { type: 'AUDIO_SET_WAITING', waiting: boolean }
    ;

export const setAudioControl = (control: () => AudioControl): AudioAction => ({
    type: 'AUDIO_SET_CONTROL',
    control
});

export const setDurationDone = (duration: number): AudioAction => ({
    type: 'AUDIO_SET_DURATION_DONE',
    duration
});

export const seekStart = (): AudioAction => ({
    type: 'AUDIO_SEEK_START'
});

export const seekEnd = (position: number): AudioAction => ({
    type: 'AUDIO_SEEK_END',
    position
});

export const setSourceDone = (source: string): AudioAction => ({
    type: 'AUDIO_SET_SOURCE_DONE',
    source
});

export const setCurrentTimeDone = (currentTime: number): AudioAction => ({
    type: 'AUDIO_SET_CURRENT_TIME_DONE',
    currentTime
});

export const setPlayingDone = (playing: boolean): AudioAction => ({
    type: 'AUDIO_SET_PLAYING_DONE',
    playing
});

export const setWaiting = (waiting: boolean): AudioAction => ({
    type: 'AUDIO_SET_WAITING',
    waiting
});

export const setDuration =
    (duration: number): ThunkAction<void, State, void> =>
        (dispatch, getState) => {
            const { control } = getState().audio;
            if (control) {
                dispatch(setDurationDone(duration));
            }
        };

export const seek =
    (position: number): ThunkAction<void, State, void> =>
        (dispatch, getState) => {
            const { control } = getState().audio;
            if (control) {
                dispatch(seekStart());
                dispatch(setCurrentTime(position));
                dispatch(seekEnd(position));
            }
        };

export const setPlaying =
    (play: boolean): ThunkAction<void, State, void> =>
        async (_, getState) => {
            const { control } = getState().audio;
            if (control) {
                if (play) {
                    return await control().play();
                } else {
                    return await control().pause();
                }
            }
        };

export const setStop =
    (): ThunkAction<void, State, void> =>
        async (_, getState) => {
            const { control } = getState().audio;
            if (control) {
                await control().stop();
            }
        };

export const setSource =
    (sources: string[]): ThunkAction<void, State, void> =>
        (dispatch, getState) => {
            const { control } = getState().audio;
            if (control) {
                const { element } = control().audio;
                const source = sources.reduce((acc, cur) => {
                    const canPlay = element.canPlayType(getType(acc));
                    return ((canPlay && canPlay.length > 0) ? acc : cur);
                }, '');

                if (control().setSourceUrl(source)) {
                    dispatch(setSourceDone(source));
                }
            }
        };

export const setCurrentTime =
    (time: number): ThunkAction<void, State, void> =>
        (dispatch, getState) => {
            const { control } = getState().audio;

            if (control && control().audio.element.currentTime != time) {
                control().audio.element.currentTime = time;
                return;
            }
            if (!getState().audio.seeking) {
                dispatch(setCurrentTimeDone(time));
            }
        }
