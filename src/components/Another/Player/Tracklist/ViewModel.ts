import { State } from "../../../../types/index";
import { Actions } from "./Controller";
import { Props } from "./Model";
import { getCurrentTrack, getTracks } from "../../../../selectors/archive";

export default (state: State, actions: Actions, props: Props) => ({
    track: getCurrentTrack(state, state.ui.mixId),
    tracks: getTracks(state, state.ui.mixId),
    actions,
    classes: props.classes,
});
