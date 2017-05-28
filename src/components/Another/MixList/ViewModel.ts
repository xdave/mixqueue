import { State } from "../../../types/index";
import { getMixes } from "../../../selectors/archive";

export const ViewModel = (state: State) => ({
    router: state.router,
    visible: state.ui.mixListVisible,
    mixes: getMixes(state)
});
