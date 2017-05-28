import { State } from "../../../types/index";

export const ViewModel = (state: State) => ({
    state,
    control: state.audio.control
});
