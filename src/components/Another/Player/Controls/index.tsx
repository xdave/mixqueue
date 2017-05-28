import * as React from 'react';
import { connect } from '../../../../util/jss';
import { State } from "../../../../types/index";
import { Dispatch } from "redux";
import { bindActionCreators } from "redux";
import * as audioActions from '../../../../actions/audio';
import { getMixById, getAudioUrls } from "../../../../selectors/archive";

const IconButton = require('material-ui/IconButton').default;
const PlayArrow = require('material-ui-icons/PlayArrow').default;
const Pause = require('material-ui-icons/Pause').default;

type Actions = typeof audioActions;

const ViewModel = (state: State, props: { className?: string }) => ({
    playing: state.audio.playing,
    mix: getMixById(state, state.ui.mixId),
    ...props
});

const Controller = (dispatch: Dispatch<Actions>) => ({
    actions: bindActionCreators({ ...audioActions }, dispatch)
});

const C = connect({}, ViewModel, Controller);

export default C(({ playing, className, mix, actions }) => (
    <div className={className}>
        <IconButton>
            {playing
                ? <Pause onClick={() => actions.setPlaying(false)} />
                : <PlayArrow onClick={() => {
                    if (mix) {
                        actions.setSource(getAudioUrls(mix));
                        actions.setPlaying(true);
                    }
                }} />
            }
        </IconButton>
    </div>
));
