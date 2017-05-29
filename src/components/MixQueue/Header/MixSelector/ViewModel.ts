import { State } from "../../../../types/index";
import { Actions } from "./Controller";
import { Props } from "./Model";

export const ViewModel = (state: State, actions: Actions, props: Props) => ({
    mixId: state.ui.mixId,
    mixes: state.archive.searchResults,
    classes: props.classes,
    width: props.width,
    actions,
    preload: async () => {
        const { mixId } = state.ui;
        const { searchResults } = state.archive;
        const mixInfo = searchResults.find(m => m.identifier === mixId);
        if (mixId && !mixInfo && actions.searchFetch) {
            return await actions.searchFetch();
        }
    }
});
