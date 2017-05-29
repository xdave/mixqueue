import { State } from "../../../../../types/index";
import { Props } from "./Model";

export const ViewModel = (state: State, actions: {}, props: Props) => ({
    audio: {
        playing: state.audio.playing,
        duration: state.audio.duration,
        currentTime: state.audio.currentTime,
    },
    actions,
    classes: props.classes,
    width: props.width,
    track: props.track
});
