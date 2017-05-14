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
    const ctx = new AudioContext();
    const audio = new Audio();
    return () => ({
        context: ctx,
        element: audio
    });
};

export class AudioControl {
    actions: typeof audioActions;
    audio: AudioController;
    constructor(public store: Store<State>, getAudio: () => AudioController) {
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

        this.audio.element.removeEventListener('playing', this.onPlaying);
        this.audio.element.addEventListener('playing', this.onPlaying);

        this.audio.element.removeEventListener('waiting', this.onWaiting);
        this.audio.element.addEventListener('waiting', this.onWaiting);

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
