import { Audio } from '../types';
import * as actions from '../actions/audio';

const initial: Audio = {
    control: undefined,
    elementId: 'audioElement',
    mixes: [],
    activeMixes: [],
    activeTracks: [],
    currentTime: 0,
    playing: false,
    duration: 0,
    seeking: false
};

export const audio = (state = initial, action: actions.AudioAction): Audio => {
    switch (action.type) {
        case 'AUDIO_SET_CONTROL':
            return {
                ...state,
                control: action.control
            };
        case 'AUDIO_SET_DURATION_DONE':
            return {
                ...state,
                duration: action.duration
            };
        case 'AUDIO_SEEK_START':
            return {
                ...state,
                seeking: true
            };
        case 'AUDIO_SEEK_END':
            return {
                ...state,
                seeking: false
            };
        case 'AUDIO_SET_ACTIVE_MIX':
            return {
                ...state,
                activeMixes: [action.mix]
            };
        case 'AUDIO_SET_ACTIVE_TRACK':
            return {
                ...state,
                activeTracks: [action.track]
            };
        case 'AUDIO_SET_CURRENT_TIME_DONE':
            return {
                ...state,
                currentTime: action.currentTime
            };
        case 'AUDIO_SET_PLAYING_DONE':
            return {
                ...state,
                playing: action.playing
            };
        case 'AUDIO_MIXES_FETCHING':
            return state; // TODO: fetching flag
        case 'AUDIO_MIXES_FETCHED':
            return {
                ...state,
                mixes: action.mixes
            };
        case 'AUDIO_MIX_FETCHING':
            return state; // TODO: fetching flag
        case 'AUDIO_MIX_FETCHED': {
            const { mix } = action;
            return {
                ...state,
                mixes: state.mixes.map(m => m.id === mix.id ? mix : m),
            };
        }
        default:
            return state;
    }
}
