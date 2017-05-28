import { State } from "../../../../types/index";

export const ViewModel = (state: State) => ({
    mixId: state.ui.mixId,
    mixes: state.archive.searchResults
});
