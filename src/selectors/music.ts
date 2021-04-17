import { State } from "../types";
import { getType } from "../util/fileType";

export const getPlayableUrl = (
  _: State,
  el: HTMLAudioElement,
  urls: string[]
) =>
  urls.reduce(
    (acc, cur) =>
      ["probably", "maybe"].some((r) => el.canPlayType(getType(acc)) === r)
        ? acc
        : cur,
    ""
  );

export const getMusicElement = (state: State) => state.music.control().element;
