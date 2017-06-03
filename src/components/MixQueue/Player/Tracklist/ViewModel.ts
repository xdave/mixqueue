import { State } from "../../../../types/index";
import { Controller } from "./Controller";
import { Props } from "./Model";
import { getCurrentTrack, getTracks } from "../../../../selectors/archive";

export const ViewModel = (state: State, actions: typeof Controller, props: Props) => ({
    mixId: props.mixId,
    track: getCurrentTrack(state, props.mixId),
    tracks: getTracks(state, props.mixId),
    classes: props.classes,
    actions
});
