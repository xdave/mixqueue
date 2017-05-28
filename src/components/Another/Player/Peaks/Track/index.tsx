import * as React from 'react';
import { connect } from '../../../../../util/jss';
import { State, Track } from "../../../../../types/index";
import { Dispatch } from "redux";
import { bindActionCreators } from "redux";
import * as audioActions from '../../../../../actions/audio';
import { qXFromPos } from "../../../../../util/player";

type Actions = typeof audioActions;

type Props = {
    track: Track;
}

const styles = {
    track: {
        position: 'absolute',
        borderLeft: '1px dotted rgba(255,255,255,0.5)',
        height: '100%',
        color: '#fff'
    }
};

const ViewModel = (state: State, props: Props) => ({
    audio: {
        playing: state.audio.playing,
        duration: state.audio.duration,
        currentTime: state.audio.currentTime,
    },
    ...props
});

const Controller = (dispatch: Dispatch<Actions>) => ({
    actions: {
        audio: bindActionCreators({ ...audioActions }, dispatch)
    }
});

const C = connect(styles, ViewModel, Controller);

export default C(({ classes, track, audio }) => {
    return (
        <div
            className={classes.track}
            style={{ left: qXFromPos('.peaks', track.time, audio.duration) }}
        >
            <span style={{ fontSize: '9px' }}>
                {track.number}
            </span>
        </div>
    )
});
