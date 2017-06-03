import { State } from "../../../types/index";
import { Controller } from "./Controller";
import { Props } from "./Model";
import { getMixById, getAudioUrls } from "../../../selectors/archive";
import { getPlayableUrl } from "../../../selectors/music";

export const ViewModel = (state: State, actions: typeof Controller, props: Props) => ({
    match: props.match,
    classes: props.classes,
    archive: {
        mix: getMixById(state, props.match.params.mixId)
    },
    preload: async () => {
        if (props.match.params.mixId) {
            const mix = getMixById(state, props.match.params.mixId);

            if (!mix) {
                await actions.fetchMetadata({ id: props.match.params.mixId });
            } else {
                const el = state.music.control().element;
                const urls = getAudioUrls(mix);
                const url = getPlayableUrl(state, el, urls);

                if (url) {
                    actions.setSrc({ src: url });
                }
            }
        }
    }
});
