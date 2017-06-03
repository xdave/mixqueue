import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Music } from "../types/index";
import * as actions from "../actions/music";
import { MusicControl } from "../util/music";

export const initial: Music.State = {
    control: () => (({} as any) as MusicControl),
    currentTime: 0,
    duration: 0,
    playing: false,
    waiting: false,
    seeking: false,
    src: ''
};

export const music = reducerWithInitialState(initial)
    .case(actions.setControl, (state, { control }) => ({
        ...state,
        control
    }))
    .case(actions.playAsync.started, state => state)
    .case(actions.playAsync.done, state => state)
    .case(actions.playAsync.failed, state => state)

    .case(actions.pauseAsync.started, state => state)
    .case(actions.pauseAsync.done, state => state)
    .case(actions.pauseAsync.failed, state => state
    )
    .case(actions.stopAsync.started, state => state)
    .case(actions.stopAsync.done, state => state)
    .case(actions.stopAsync.failed, state => state)

    .case(actions.setSrcAsync.started, state => state)
    .case(actions.setSrcAsync.done, (state, { params }) => ({
        ...state,
        src: params.src
    }))
    .case(actions.setSrcAsync.failed, state => state)

    .case(actions.setTimeAsync.started, state => state)
    .case(actions.setTimeAsync.done, state => state)
    .case(actions.setTimeAsync.failed, state => state)

    .case(actions.setSeeking, (state, { seeking }) => ({
        ...state,
        seeking
    }))
    .case(actions.setPlaying, (state, { playing }) => ({
        ...state,
        playing
    }))
    .case(actions.setWaiting, (state, { waiting}) => ({
        ...state,
        waiting
    }))
    .case(actions.timeUpdate, (state, { currentTime }) => ({
        ...state,
        currentTime: state.seeking ? state.currentTime : currentTime
    }))
    .case(actions.loadedMetadata, (state, { duration }) => ({
        ...state,
        duration
    }));
