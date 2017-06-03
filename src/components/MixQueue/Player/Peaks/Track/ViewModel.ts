import { State } from "../../../../../types/index";
import { Props } from "./Model";

export const ViewModel = (state: State, actions: {}, props: Props) => ({
    music: {
        playing: state.music.playing,
        duration: state.music.duration,
        currentTime: state.music.currentTime,
    },
    actions,
    classes: props.classes,
    width: props.width,
    track: props.track
});
