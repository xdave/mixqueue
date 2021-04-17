import { reducerWithInitialState } from "typescript-fsa-reducers";
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
  src: "",
};

export const music = reducerWithInitialState(initial)
  .case(actions.setControl, (state, { control }) => ({
    ...state,
    control,
  }))
  .case(actions.play.async.started, (state) => state)
  .case(actions.play.async.done, (state) => state)
  .case(actions.play.async.failed, (state) => state)

  .case(actions.pause.async.started, (state) => state)
  .case(actions.pause.async.done, (state) => state)
  .case(actions.pause.async.failed, (state) => state)
  .case(actions.stop.async.started, (state) => state)
  .case(actions.stop.async.done, (state) => state)
  .case(actions.stop.async.failed, (state) => state)

  .case(actions.setSrc.async.started, (state) => state)
  .case(actions.setSrc.async.done, (state, { params }) => ({
    ...state,
    src: params.src,
  }))
  .case(actions.setSrc.async.failed, (state) => state)

  .case(actions.setTime.async.started, (state) => state)
  .case(actions.setTime.async.done, (state) => state)
  .case(actions.setTime.async.failed, (state) => state)

  .case(actions.setSeeking, (state, { seeking }) => ({
    ...state,
    seeking,
  }))
  .case(actions.setPlaying, (state, { playing }) => ({
    ...state,
    playing,
  }))
  .case(actions.setWaiting, (state, { waiting }) => ({
    ...state,
    waiting,
  }))
  .case(actions.timeUpdate, (state, { currentTime }) => ({
    ...state,
    currentTime: state.seeking ? state.currentTime : currentTime,
  }))
  .case(actions.loadedMetadata, (state, { duration }) => ({
    ...state,
    duration,
  }));
