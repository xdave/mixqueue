import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { State } from "../types";
import { MusicControl } from "../util/music";

const create = actionCreatorFactory("music");
const createAsync = asyncFactory<State>(create);

export const setControl = create<{ control: () => MusicControl }>(
  "SET_CONTROL"
);

export const play = createAsync("PLAY", async (_, __, getState) => {
  const { control } = getState().music;
  await control().play();
});

export const pause = createAsync("PAUSE", async (_, __, getState) => {
  const { control } = getState().music;
  await control().pause();
});

export const stop = createAsync("STOP", async (_, __, getState) => {
  const { control } = getState().music;
  await control().stop();
});

export const setSrc = createAsync<{ src: string }, boolean, State>(
  "SET_SRC",
  async ({ src }, _, getState) => {
    const { control } = getState().music;
    return control().setSourceUrl(src);
  }
);

export const setTime = createAsync<{ time: number }, any, State>(
  "SET_TIME",
  async ({ time }, _, getState) => {
    const { control } = getState().music;
    return control().setCurrentTime(time);
  }
);

export const setSeeking = create<{ seeking: boolean }>("SET_SEEKING");
export const setPlaying = create<{ playing: boolean }>("SET_PLAYING");
export const setWaiting = create<{ waiting: boolean }>("SET_WAITING");
export const timeUpdate = create<{ currentTime: number }>("TIME_UPDATE");
export const loadedMetadata = create<{ duration: number }>("LOADED_METADATA");
