import { bindActionCreators, Store } from 'redux';
import * as musicActions from '../actions/music';
import { State } from "../types";

declare const window: {
    webkitAudioContext: AudioContext;
    AudioContext: AudioContext;
    __MUSIC__: MusicControl;
} & Window;

window.AudioContext = window.AudioContext || window.webkitAudioContext;

export const music = () => window.__MUSIC__;

export class MusicControl {
    // context: AudioContext;
    element: HTMLAudioElement;
    // source?: MediaElementAudioSourceNode;
    actions: {
        setPlaying: typeof musicActions.setPlaying;
        setWaiting: typeof musicActions.setWaiting;
        timeUpdate: typeof musicActions.timeUpdate;
        setSrc: typeof musicActions.setSrc;
        loadedMetadata: typeof musicActions.loadedMetadata;
    };

    constructor(public store: Store<State>) {
        // this.context = new AudioContext();
        this.element = document.getElementById('temp_audio') as HTMLAudioElement;
        // this.element = new Audio();
        this.element.crossOrigin = 'anonymous';
        this.element.autoplay = true;
        this.actions = bindActionCreators({
            setPlaying: musicActions.setPlaying,
            setWaiting: musicActions.setWaiting,
            timeUpdate: musicActions.timeUpdate,
            setSrc: musicActions.setSrc,
            loadedMetadata: musicActions.loadedMetadata
        }, store.dispatch.bind(store));

        window.addEventListener('load', this.onLoad);
        this.element.addEventListener('timeupdate', this.timeUpdate);
        this.element.addEventListener('playing', this.onPlaying);
        this.element.addEventListener('waiting', this.onWaiting);
        this.element.addEventListener('play', this.onPlay);
        this.element.addEventListener('pause', this.onPause);
        this.element.addEventListener('loadedmetadata', this.onDurationChange);
    }

    onLoad = () => {
        // if (this.context && this.element && !this.source) {
        //     this.source = this.context
        //         .createMediaElementSource(this.element);

        //     this.source.connect(this.context.destination);
        // }
    };

    play = () => {
        return this.element.play();
    };

    pause = () => {
        return this.element.pause();
    };

    stop = async () => {
        const result = await this.element.pause();
        this.element.currentTime = 0;
        return result;
    };


    setSourceUrl = (url: string) => {
        if (url) {
            const src = encodeURI(url);
            if (this.element.src != src) {
                this.element.src = src;
                return true;
            }
        }
        return false;
    };

    setCurrentTime = (time: number) => {
        this.element.currentTime = time;
    }

    onWaiting = () => {
        this.actions.setWaiting({ waiting: true });
    }
    onPlaying = () => {
        this.actions.setWaiting({ waiting: false });
    }

    onPlay = () => {
        this.actions.setPlaying({ playing: true });
    }

    onPause = () => {
        this.actions.setPlaying({ playing: false });
    }

    timeUpdate = () => {
        this.actions.timeUpdate({ currentTime: this.element.currentTime });
    };

    onDurationChange = () => {
        this.actions.loadedMetadata({ duration: this.element.duration });
    };
}

export default MusicControl;
