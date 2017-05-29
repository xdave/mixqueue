import * as React from 'react';
import { connect } from '../../../util/jss';
import theme from '../../../util/theme';
import Paper from 'material-ui/Paper';
import Peaks from './Peaks';
import { State, MixInfo } from "../../../types/index";
import { Preload } from "../../util/Preload";
import * as archiveActions from '../../../actions/archive';
import * as audioActions from '../../../actions/audio';
import { bindActionCreators } from "redux";
import { Dispatch } from "redux";
import { getAudioUrls, getMixById, getTracks } from "../../../selectors/archive";
import Tracklist from './Tracklist';

type Actions = typeof archiveActions & typeof audioActions;

const styles = {
    paper: {
        position: 'relative',
        margin: `${theme.spacing.unit}px`,
        padding: `${theme.spacing.unit}px`
    },
    tracklist: {
        height: '175px',
        overflowY: 'scroll'
    },
    track: {
        fontWeight: 'bold'
    }
}

const ViewModel = (state: State) => ({
    mixId: state.ui.mixId,
    mix: getMixById(state, state.ui.mixId),
    // track: getCurrentTrack(state, state.ui.mixId),
    tracks: getTracks(state, state.ui.mixId)
});

const Controller = (dispatch: Dispatch<Actions>) => ({
    actions: {
        ...bindActionCreators({ ...archiveActions }, dispatch),
        ...bindActionCreators({ ...audioActions }, dispatch)
    }
})

const C = connect(styles, ViewModel, Controller);

const preload = (id: string, actions: Actions, mix?: MixInfo) => async () => {
    if (id) {
        if (!mix) {
            const fetched = await actions.metadataFetch(id);
            return actions.setSource(getAudioUrls((fetched as any) as MixInfo));
        }
        return actions.setSource(getAudioUrls(mix));
    }
};

export const View = C(({ classes, mixId, mix, actions }) => {
    return (
        <Preload key={`player-${mixId}`} wait preload={preload(mixId, actions, mix)}>
            <Paper className={classes.paper}>
                <Peaks />
            </Paper>
            <Tracklist />
        </Preload>
    )
});
