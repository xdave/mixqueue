import { State } from "../../../../types/index";
import { Controller } from "./Controller";
import { Props } from "./Model";
import { getTracks, getPeaks } from "../../../../selectors/archive";

export const ViewModel = (state: State, actions: typeof Controller, props: Props) => ({
    mixId: props.mixId,
    music: {
        playing: state.music.playing,
        duration: state.music.duration,
        currentTime: state.music.currentTime,
        selectingPos: state.ui.selectingPos,
        posSelectTime: state.ui.posSelectTime,
        posSelectX: state.ui.posSelectX
    },
    tracks: getTracks(state, props.mixId),
    peaks: getPeaks(state, props.mixId),
    actions,
    classes: props.classes
});
