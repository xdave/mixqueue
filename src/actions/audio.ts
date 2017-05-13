import * as fetchP from 'fetch-jsonp';
import { ThunkAction } from 'redux-thunk'
import { State, Mix, MixInfo, MixSearchResults, MixFile, Track } from '../types';
import { AudioControl } from "../util/audio";
import { getAudioSources } from "../util/player";

const baseURL = 'https://archive.org';
const searchPage = 'advancedsearch.php';
const searchTerm = '"Dave+Gradwell"+Mix';
const searchURL = `${searchPage}?q=${searchTerm}&fl[]=identifier&fl[]=title&fl[]=date&output=json`;
const fetchOptions: RequestInit = { mode: 'cors' };

export type AudioAction
    = { type: 'AUDIO_SET_CONTROL', control: AudioControl }
    | { type: 'AUDIO_SET_DURATION_DONE', duration: number }
    | { type: 'AUDIO_SEEK_START' }
    | { type: 'AUDIO_SEEK_END', position: number }
    | { type: 'AUDIO_SET_SOURCE_DONE', source: string }
    | { type: 'AUDIO_SET_ACTIVE_MIX', mix: Mix }
    | { type: 'AUDIO_SET_ACTIVE_TRACK', track: Track }
    | { type: 'AUDIO_SET_CURRENT_TIME_DONE', currentTime: number }
    | { type: 'AUDIO_SET_PLAYING_DONE', playing: boolean }
    | { type: 'AUDIO_SET_WAITING', waiting: boolean }
    | { type: 'AUDIO_MIXES_FETCHING' }
    | { type: 'AUDIO_MIXES_FETCHED', mixes: Mix[] }
    | { type: 'AUDIO_MIX_FETCHING' }
    | { type: 'AUDIO_MIX_FETCHED', mix: Mix }

export const setAudioControl = (control: AudioControl): AudioAction => ({
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

export const setActiveMix = (mix: Mix): AudioAction => ({
    type: 'AUDIO_SET_ACTIVE_MIX',
    mix
});

export const setActiveTrack = (track: Track): AudioAction => ({
    type: 'AUDIO_SET_ACTIVE_TRACK',
    track
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

export const mixesFetching = (): AudioAction => ({
    type: 'AUDIO_MIXES_FETCHING'
});

export const mixesFetched = (mixes: Mix[]): AudioAction => ({
    type: 'AUDIO_MIXES_FETCHED',
    mixes
});

export const mixFetching = (): AudioAction => ({
    type: 'AUDIO_MIX_FETCHING'
});

export const mixFetched = (mix: Mix): AudioAction => ({
    type: 'AUDIO_MIX_FETCHED',
    mix
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

export const skipPrevious =
    (): ThunkAction<void, State, void> =>
        (dispatch, getState) => {
            const { activeMixes, activeTracks} = getState().audio;
            const [mix] = activeMixes;
            const [active] = activeTracks;
            const { tracks } = mix.cueSheet;
            const track = tracks.find(t => t.number === active.number - 1)
                || tracks[tracks.length - 1];
            if (track && active.number !== track.number) {
                dispatch(seek(track.time));
            }
        };

export const skipNext =
    (): ThunkAction<void, State, void> =>
        (dispatch, getState) => {
            const { activeMixes, activeTracks } = getState().audio;
            const [mix] = activeMixes;
            const [active] = activeTracks;
            const { tracks } = mix.cueSheet;
            const track = tracks.find(t => t.number === active.number + 1)
                || tracks[0];
            if (track && active.number !== track.number) {
                dispatch(seek(track.time));
            }
        };

export const setPlaying =
    (play: boolean): ThunkAction<void, State, void> =>
        async (_, getState) => {
            const { control } = getState().audio;
            if (control) {
                if (play) {
                    await control.play();
                } else {
                    await control.pause();
                }
            }
        };

export const setStop =
    (): ThunkAction<void, State, void> =>
        async (_, getState) => {
            const { control } = getState().audio;
            if (control) {
                await control.stop();
            }
        };

export const setSource =
    (source: string): ThunkAction<void, State, void> =>
        (dispatch, getState) => {
            const { control } = getState().audio;
            if (control) {
                control.setSourceUrl(source);
                dispatch(setSourceDone(source));
            }
        };

export const setCurrentTime =
    (time: number): ThunkAction<void, State, void> =>
        (dispatch, getState) => {
            const { activeMixes, activeTracks, control } = getState().audio;

            if (control && control.audio.element.currentTime != time) {
                control.audio.element.currentTime = time;
                return;
            }

            dispatch(setCurrentTimeDone(time));

            const [activeMix] = activeMixes;
            const [activeTrack] = activeTracks;
            const { tracks } = activeMix.cueSheet;

            const track = tracks.reduce((prev, cur) => {
                return (time >= prev.time && time < cur.time)
                    ? prev
                    : cur
            });

            if (activeTrack.title !== track.title) {
                dispatch(setActiveTrack(track))
            }
        }

export const setCurrentTrack =
    (time: number): ThunkAction<void, State, void> =>
        (dispatch, getState) => {
            const { activeMixes, activeTracks } = getState().audio;
            const [activeMix] = activeMixes;
            const [activeTrack] = activeTracks;
            const { tracks } = activeMix.cueSheet;

            const track = tracks.reduce((prev, cur) => {
                return (time >= prev.time && time < cur.time)
                    ? prev
                    : cur
            });

            if (activeTrack.title !== track.title) {
                dispatch(setActiveTrack(track))
            }
        };

export const mixesFetch =
    (): ThunkAction<void, State, void> =>
        async dispatch => {
            dispatch(mixesFetching());
            // const url = encodeURI(`${baseURL}/${searchURL}`);
            // const response = await fetchP(url); // JSON-P needed 'cause no CORS.
            const url = './mixes/index.json';
            const response = await fetch(url);
            const json = await (response.json() as Promise<MixSearchResults>);
            const mixes = json.response.docs.map(doc => ({
                id: doc.identifier,
                title: doc.title,
                date: doc.date,
                files: [] as MixFile[],
                sources: [] as string[]
            })) as Mix[];

            dispatch(mixesFetched(mixes));
            return mixes;
        };

export const mixFetch = (id: string): ThunkAction<void, State, void> =>
    async (dispatch, getState) => {
        dispatch(mixFetching());
        const url = encodeURI(`${baseURL}/metadata/${id}?output=json`);
        const response = await fetch(url, fetchOptions);
        const json = await (response.json() as Promise<MixInfo>);
        const [mix] = getState().audio.mixes.filter(m => m.id === id);
        const completeMix: Mix = {
            ...mix,
            files: json.files,
            cueSheet: json[id],
            sources: getAudioSources(json.files, mix.id)
        };
        dispatch(mixFetched(completeMix));
        return completeMix;
    };
