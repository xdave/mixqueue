import { Audio } from '../types';
import * as actions from '../actions/audio';

const initial: Audio = {
    control: undefined,
    currentTime: 0,
    playing: false,
    duration: 0,
    seeking: false,
    waiting: false
};

export const audio = (state = initial, action: actions.AudioAction) => {
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
        case 'AUDIO_SET_WAITING':
            return {
                ...state,
                waiting: action.waiting
            };
        default:
            return state;
    }
}
