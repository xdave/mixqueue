import { State } from "../../../types/index";
import { Actions } from "./Controller";
import { Props } from "./Model";

export const ViewModel = (state: State, actions: Actions, props: Props) => ({
    control: state.audio.control,
    classes: props.classes,
    actions
});
