import { State, MixInfo, Track } from '../types';
import { createSelector } from 'reselect';

const getState = (state: State) => state.archive;
const getMusicState = (state: State) => state.music;

const _getMixById = (state: State, id: string) =>
    state.archive.mixes.find(m => m.metadata.identifier === id);

const _getTrackByNumber = (state: State, id: string, track: string) =>
    getTracks(state, id).find(t => t.number === parseInt(track, 10));

export const getMixById = createSelector(
    _getMixById,
    mix => mix
);

export const getPeaksFile = createSelector(
    _getMixById,
    mix => mix && mix.files.find(f => /png$/.test(f.name))
);

export const getPeaks = createSelector(
    [_getMixById, getPeaksFile],
    (mix, png) => (mix && png) && `https://${mix.server}${mix.dir}/${png.name}`
);

export const getPeaksUrl = getPeaks;

export const getTitle = createSelector(
    _getMixById,
    mix => mix && mix.metadata.title
);

export const getTracks = createSelector(
    _getMixById,
    mix => mix ? mix[mix.metadata.identifier].tracks : []
);

export const getMixes = createSelector(
    getState,
    archive => archive.searchResults
        .slice()
        .map(mix => ({ mix, date: Date.parse(mix.date) }))
        .sort((prev, next) =>
            (prev.date < next.date)
                ? 1
                : (prev.date > next.date)
                    ? -1
                    : 0)
        .map(group => group.mix)
);

export const getAudioUrls = (mix?: MixInfo) => mix
    ? mix.files
        .filter(f => [/ogg$/i, /mp3$/i, /m4a$/i].some(r => r.test(f.name)))
        .sort(a => (/m4a$/i).test(a.name) ? -1 : 1)
        .sort(a => (/mp3$/i).test(a.name) ? -1 : 1)
        .sort(a => (/ogg$/i).test(a.name) ? -1 : 1)
        .map(f => `https://${mix.server}${mix.dir}/${f.name}`)
    : [];

export const getAudioSources = createSelector(
    _getMixById,
    mix => getAudioUrls(mix)
);

export const getTrackByNumber = createSelector(
    _getTrackByNumber,
    track => track
);

export const getCurrentTrack = createSelector(
    [getTracks, getMusicState],
    (tracks, { currentTime }): Track => tracks.reduce(((prev, cur) =>
        (currentTime >= prev.time && currentTime < cur.time)
            ? prev
            : cur
    ), { time: 0, title: '', number: 0, timeDisplay: '' })
);
