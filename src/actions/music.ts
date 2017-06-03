import actionCreatorFactory from 'typescript-fsa';
import thunk from '../util/async';
import { State } from "../types/index";
import { MusicControl } from "../util/music";

const create = actionCreatorFactory('music');

export const setControl = create<{ control: () => MusicControl }>('SET_CONTROL');

export const playAsync = create.async<State, any, any, any>('PLAY');
export const play = thunk(playAsync, async (_, __, getState) => {
    const { control } = getState().music;
    await control().play();
});

export const pauseAsync = create.async<State, any, any, any>('PAUSE');
export const pause = thunk(pauseAsync, async (_, __, getState) => {
    const { control } = getState().music;
    await control().pause();
});

export const stopAsync = create.async<State, any, any, any>('STOP');
export const stop = thunk(stopAsync, async (_, __, getState) => {
    const { control } = getState().music;
    await control().stop();
});

export const setSrcAsync = create.async<State, { src: string }, boolean, any>('SET_SRC');
export const setSrc = thunk(setSrcAsync, async ({ src }, _, getState) => {
    const { control } = getState().music;
    return control().setSourceUrl(src)
});

export const setTimeAsync = create.async<State, { time: number }, any, any>('SET_TIME');
export const setTime = thunk(setTimeAsync, async ({ time }, _, getState) => {
    const { control } = getState().music;
    return control().setCurrentTime(time);
});

export const setSeeking = create<{ seeking: boolean }>('SET_SEEKING');
export const setPlaying = create<{ playing: boolean }>('SET_PLAYING');
export const setWaiting = create<{ waiting: boolean }>('SET_WAITING');
export const timeUpdate = create<{ currentTime: number }>('TIME_UPDATE');
export const loadedMetadata = create<{ duration: number }>('LOADED_METADATA');
