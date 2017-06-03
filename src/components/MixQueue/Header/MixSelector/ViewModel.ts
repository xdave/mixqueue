import { State } from "../../../../types/index";
import { Controller } from "./Controller";
import { Props } from "./Model";
import { getMixById } from "../../../../selectors/archive";

export const ViewModel = (state: State, actions: typeof Controller, props: Props) => ({
    mixId: props.mixId,
    mix: getMixById(state, props.mixId),
    classes: props.classes,
    width: props.width,
    actions
});
