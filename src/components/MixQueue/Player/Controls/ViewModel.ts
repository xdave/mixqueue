import { State } from "../../../../types/index";
import { Controller } from "./Controller";
import { Props } from "./Model";
import { getMixById } from "../../../../selectors/archive";

export const ViewModel = (state: State, actions: typeof Controller, props: Props) => ({
    mixId: props.mixId,
    playing: state.music.playing,
    play: () => {
        if (getMixById(state, props.mixId)) {
            actions.play({});
        }
    },
    pause: () => actions.pause({}),
    className: props.className
});
