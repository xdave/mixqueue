import { bindActionCreators } from 'redux';
import * as audioActions from '../actions/audio';
import { Store } from "redux";
import { State } from "../types/index";

declare const window: {
    webkitAudioContext: AudioContext;
    AudioContext: AudioContext;
    __AUDIO_CONTEXT__: AudioContext;
    __AUDIO__: HTMLAudioElement;
} & Window;

window.AudioContext = window.AudioContext || window.webkitAudioContext;

export const getAudio = () => {
    return {
        context: window.__AUDIO_CONTEXT__
            ? window.__AUDIO_CONTEXT__
            : window.__AUDIO_CONTEXT__ = new AudioContext(),
        element: window.__AUDIO__
            ? window.__AUDIO__
            : window.__AUDIO__ = new Audio(),
    };
};

export class AudioControl {
    actions: typeof audioActions;
    audio: {
        context: AudioContext;
        element: HTMLAudioElement;
        source?: MediaElementAudioSourceNode;
    };
    constructor(public store: Store<State>) {
        this.audio = getAudio();
        this.audio.element.crossOrigin = 'anonymous';
        this.audio.element.autoplay = true;

        window.removeEventListener('load', this.onLoad);
        window.addEventListener('load', this.onLoad);

        this.actions = bindActionCreators({
            ...audioActions
        }, store.dispatch.bind(store));

        this.audio.element.removeEventListener('timeupdate', this.timeUpdate);
        this.audio.element.addEventListener('timeupdate', this.timeUpdate);

        this.audio.element.removeEventListener('play', this.onPlay);
        this.audio.element.addEventListener('play', this.onPlay);

        this.audio.element.removeEventListener('pause', this.onPause);
        this.audio.element.addEventListener('pause', this.onPause);

        this.audio.element.removeEventListener('loadedmetadata', this.onDurationChange);
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
        this.audio.element.crossOrigin = 'anonymous';
        this.audio.element.src = url;
    };

    play = () => {
        this.audio.element.play();
    };

    pause = () => {
        this.audio.element.pause();
    };

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

export default (store: Store<State>) => new AudioControl(store);
