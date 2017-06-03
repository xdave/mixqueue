import { State } from "../../../types/index";
import { Controller } from "./Controller";
import { Props } from "./Model";

export const ViewModel = (state: State, actions: typeof Controller, props: Props) => ({
    mixId: props.mixId,
    classes: props.classes,
    actions: {
        unload: async () => {
            await actions.stop({});
            state.music.control().element.src = '';
            actions.loadedMetadata({ duration: 0 });
        }
    }
});
