import { State } from "../../../types/index";
import { getMixes } from "../../../selectors/archive";
import { Actions } from "./Controller";
import { Props } from "./Model";

export const ViewModel = (state: State, actions: Actions, props: Props) => ({
    mixId: state.ui.mixId,
    router: state.router,
    visible: state.ui.mixListVisible,
    mixes: getMixes(state),
    classes: props.classes,
    width: props.width,
    actions
});
