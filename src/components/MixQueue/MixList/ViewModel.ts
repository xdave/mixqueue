import { State, MixSearchResult } from "../../../types/index";
import { getMixes } from "../../../selectors/archive";
import { Controller } from "./Controller";
import { Props } from "./Model";

export const ViewModel = (state: State, actions: typeof Controller, props: Props) => ({
    mixId: props.mixId,
    router: state.router,
    visible: state.ui.mixListVisible,
    mixes: getMixes(state),
    classes: props.classes,
    width: props.width,
    actions,
    preload: (mixes: MixSearchResult[]) => async () => {
        if (mixes.length === 0) {
            const title = `title:mix OR title:guestmix OR title:best`;
            const creator = `creator:"David Gradwell" OR creator:"Dave Gradwell"`;
            const q = `(${title}) AND (${creator})`;
            return await actions.search({ q });
        }
        return '';
    }
});
