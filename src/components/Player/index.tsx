import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { State } from "../../types/index";
import * as actions from '../../actions/audio';
import { connectWithStyle } from '../../util/jss';

import Controls from './Controls';
import { getActiveMix, getActiveTrack } from "../../selectors/audio";

import Peaks from './Peaks';

import Paper from 'material-ui/Paper';
const Grid = require('material-ui/Grid').default;

const styleSheet = {
    playerGrid: {
        width: '100%',
        alignIitems: 'center',
        justifyContent: 'center'
    },
    player: {
        borderRadius: '10px',
        padding: '10px',
        margin: '10px',
        width: '95%'
        // minWidth: '100%'
        // maxWidth: '100%'
    }
};

const mapState = (state: State) => ({
    currentTime: state.audio.currentTime,
    activeMixes: state.audio.activeMixes,
    activeTracks: state.audio.activeTracks,
    playing: state.audio.playing,
    duration: state.audio.duration,
    seeking: state.audio.seeking,
    waiting: state.audio.waiting,
    mix: getActiveMix(state),
    activeTrack: getActiveTrack(state)
});

const mapActions = (dispatch: Dispatch<actions.AudioAction>) =>
    bindActionCreators({ ...actions }, dispatch);

const C = connectWithStyle(styleSheet, mapState, mapActions);

export default C(({ classes, ...props }) => (
    <Grid className={classes.playerGrid} container>
        <Paper className={classes.player} elevation={7}>
            <Controls track={props.activeTrack} />
            <Peaks />
        </Paper>
    </Grid>
));
