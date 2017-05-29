import { State, MixInfo } from "../../../../types/index";
import { Actions } from "./Controller";
import { Props } from "./Model";
import { getMixById, getAudioUrls } from "../../../../selectors/archive";

export const ViewModel = (state: State, actions: Actions, props: Props) => ({
    playing: state.audio.playing,
    mix: getMixById(state, state.ui.mixId),
    play: (mix?: MixInfo) => () => {
        if (mix) {
            actions.setSource(getAudioUrls(mix));
            actions.setPlaying(true);
        }
    },
    pause: () => actions.setPlaying(false),
    className: props.className
});
