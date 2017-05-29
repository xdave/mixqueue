import { State } from "../../types/index";
import { Actions } from "./Controller";
import { Props } from "./Model";

export const ViewModel = (_: State, __: Actions, props: Props) => ({
    classes: props.classes,
    width: props.width,
    msg: props.msg
});
