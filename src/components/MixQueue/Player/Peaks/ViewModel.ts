import { State } from "../../../../types/index";
import { Actions } from "./Controller";
import { Props } from "./Model";
import { getTracks, getPeaks } from "../../../../selectors/archive";

export const ViewModel = (state: State, actions: Actions, props: Props) => ({
    audio: {
        playing: state.audio.playing,
        duration: state.audio.duration,
        currentTime: state.audio.currentTime,
        selectingPos: state.ui.selectingPos,
        posSelectTime: state.ui.posSelectTime,
        posSelectX: state.ui.posSelectX
    },
    tracks: getTracks(state, state.ui.mixId),
    peaks: getPeaks(state, state.ui.mixId),
    actions,
    classes: props.classes
});
