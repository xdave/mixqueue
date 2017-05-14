import * as React from 'react';
import { connectWithStyle } from '../../util/jss';
import * as actions from '../../actions/audio';
import { secondsToTime, zeroPad } from "../../util/player";
import { Track, State } from "../../types/index";
import { Dispatch } from "redux";
import { bindActionCreators } from "redux";
const IconButton = require('material-ui/IconButton').default;
const PlayArrow = require('material-ui-icons/PlayArrow').default;
const Pause = require('material-ui-icons/Pause').default;
const Stop = require('material-ui-icons/Stop').default;
const SkipPrevious = require('material-ui-icons/SkipPrevious').default;
const SkipNext = require('material-ui-icons/SkipNext').default;
const Grid = require('material-ui/Grid').default;
const Typography = require("material-ui/Typography").default;
const { CircularProgress } = require('material-ui/Progress');

interface OwnProps {
    track: Track;
}

const styles = {
    controls: {
        alignItems: 'center',
        width: '100%'
    },
    waiting: {
        width: '50px'
    },
    duration: {
        marginLeft: 'auto'
    }
};

const mapState = (state: State, props: OwnProps) => ({
    currentTime: state.audio.currentTime,
    duration: state.audio.duration,
    playing: state.audio.playing,
    waiting: state.audio.waiting,
    ...props
});

const mapActions = (dispatch: Dispatch<actions.AudioAction>) =>
    bindActionCreators({ ...actions }, dispatch);

const C = connectWithStyle(styles, mapState, mapActions);

export default C(props => {
    const {
        classes,
        currentTime,
        duration,
        playing,
        waiting,
        track,
        ...actions } = props;

    return (
        <Grid container className={classes.controls}>
            <Grid item>
                <IconButton onClick={() => actions.skipPrevious()} disabled={!track}>
                    <SkipPrevious />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={() => actions.setPlaying(!playing)} disabled={!track}>
                    {playing ? <Pause /> : <PlayArrow />}
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={() => actions.setStop()} disabled={!track}>
                    <Stop />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={() => actions.skipNext()} disabled={!track}>
                    <SkipNext />
                </IconButton>
            </Grid>
            <Grid item>
                <Typography type="title" colorInherit>
                    <code>
                        {secondsToTime(currentTime)}
                    </code>
                </Typography>
            </Grid>
            <Grid item className={classes.waiting}>
                {waiting && <CircularProgress size={20} />}
            </Grid>
            <Grid item>
                <Typography type="title" colorInherit>
                    {track && (
                        <div>
                            <span>{zeroPad(track.number)}.{` `}</span>
                            <span>{track.title}</span>
                        </div>
                    ) || 'No mix loaded'}
                </Typography>

            </Grid>
            <Grid item className={classes.duration}>
                <Typography type="title" colorInherit>
                    <code>
                        {secondsToTime(duration)}
                    </code>
                </Typography>
            </Grid>
        </Grid>
    );
});
