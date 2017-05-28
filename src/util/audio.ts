import { bindActionCreators } from 'redux';
import * as audioActions from '../actions/audio';
import { Store } from "redux";
import { State } from "../types/index";

declare const window: {
    webkitAudioContext: AudioContext;
    AudioContext: AudioContext;
} & Window;

window.AudioContext = window.AudioContext || window.webkitAudioContext;

interface AudioController {
    context: AudioContext;
    element: HTMLAudioElement;
    source?: MediaElementAudioSourceNode;
}

export const createGetAudio = () => {
    const context = new AudioContext();
    const element = new Audio();
    element.crossOrigin = 'anonymous';

    return () => ({ context, element });
};

export class AudioControl {
    actions: typeof audioActions;
    audio: AudioController;
    constructor(public store: Store<State>, getAudio: () => AudioController) {
        this.audio = getAudio();
        this.audio.element.crossOrigin = 'anonymous';
        this.audio.element.autoplay = true;

        this.actions = bindActionCreators({
            ...audioActions
        }, store.dispatch.bind(store));

        window.addEventListener('load', this.onLoad);
        this.audio.element.addEventListener('timeupdate', this.timeUpdate);
        this.audio.element.addEventListener('playing', this.onPlaying);
        this.audio.element.addEventListener('waiting', this.onWaiting);
        this.audio.element.addEventListener('play', this.onPlay);
        this.audio.element.addEventListener('pause', this.onPause);
        this.audio.element.addEventListener('loadedmetadata', this.onDurationChange);
    }

    onLoad = () => {
        if (!this.audio.source) {
            this.audio.source = this.audio.context
                .createMediaElementSource(this.audio.element);

            this.audio.source.connect(this.audio.context.destination);
        }
    };

    setSourceUrl = (url: string) => {
        if (url) {
            const src = encodeURI(url);
            if (this.audio.element.src != src) {
                this.audio.element.src = src;
                return true;
            }
        }
        return false;
    };

    play = () => {
        this.audio.element.play();
    };

    pause = () => {
        this.audio.element.pause();
    };

    stop = () => {
        this.audio.element.pause();
        this.audio.element.currentTime = 0;
    };

    onWaiting = () => {
        this.actions.setWaiting(true);
    }
    onPlaying = () => {
        this.actions.setWaiting(false);
    }

    onPlay = () => {
        this.actions.setPlayingDone(true);
    }

    onPause = () => {
        this.actions.setPlayingDone(false);
    }

    timeUpdate = () => {
        if (!this.store.getState().audio.seeking) {
            this.actions.setCurrentTime(this.audio.element.currentTime);
        }
    };

    onDurationChange = () => {
        this.actions.setDuration(this.audio.element.duration);
    };
}

export default (store: Store<State>, getAudio: () => AudioController) =>
    new AudioControl(store, getAudio);
