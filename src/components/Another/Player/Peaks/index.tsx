import * as React from 'react';
import * as classNames from 'classnames';
import { connect } from '../../../../util/jss';
import { State } from "../../../../types/index";
import { Dispatch } from "redux";
import { bindActionCreators } from "redux";
import { getPeaks, getTracks } from "../../../../selectors/archive";
import { setPosFromX, secondsToTime2, qXFromPos } from "../../../../util/player";
import * as audioActions from '../../../../actions/audio';
import * as uiActions from '../../../../actions/ui';
import Controls from '../Controls';
import Track from './Track';

type Actions = typeof audioActions;

type StyleProps = {
    peaks: string;
}

const styles = {
    peaksContainer: {
        position: 'relative',
        width: '100%',
        height: '100px',
        background: {
            color: 'grey'
        }
    },
    peaks: {
        'background-image': ({ peaks }: StyleProps) =>
            peaks ? `url("${peaks}")` : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        width: '100%',
    },
    controlsContainer: {
        position: 'absolute',
        height: '100%'
    },
    controls: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
        '& svg': {
            color: '#fff'
        }
    },
    playbackPosition: {
        position: 'absolute',
        borderLeft: '1px dashed white',
        height: '100%',
    },
    currentTime: {
        position: 'absolute',
        bottom: '0px',
        color: '#fff'
    },
    duration: {
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        color: '#fff'
    },
    posSelector: {
        position: 'absolute',
        borderLeft: '1px dotted white',
        height: '100%'
    }
};

const ViewModel = (state: State) => ({
    audio: {
        playing: state.audio.playing,
        duration: state.audio.duration,
        currentTime: state.audio.currentTime,
        selectingPos: state.ui.selectingPos,
        posSelectX: state.ui.posSelectX
    },
    tracks: getTracks(state, state.ui.mixId),
    peaks: getPeaks(state, state.ui.mixId),
});

const Controller = (dispatch: Dispatch<Actions>) => ({
    actions: {
        audio: bindActionCreators({ ...audioActions }, dispatch),
        ui: bindActionCreators({ ...uiActions }, dispatch),
    }
});

const C = connect(styles, ViewModel, Controller);

export default C(({ classes, peaks, tracks, audio, actions }) => {
    return (
        <div className={classes.peaksContainer}>
            <div className={classes.controlsContainer}>
                <div className={classes.controls}>
                    <div>&nbsp;</div>
                    <Controls />
                    <div>&nbsp;</div>
                </div>
            </div>
            <div style={{ display: 'flex', flexFlow: 'row', height: '100%' }}>
                <div
                    key={`peaks-display-${peaks}`}
                    className={classNames(classes.peaks, 'peaks')}
                    onClick={setPosFromX(audio.duration, actions.audio.setCurrentTime)}
                    onMouseEnter={() => actions.ui.setSelectingPos(true)}
                    onMouseLeave={() => actions.ui.setSelectingPos(false)}
                    onMouseMove={e => {
                        const { left } = e.currentTarget.getBoundingClientRect()
                        actions.ui.setPosSelectionX(e.clientX - left)
                    }}
                >
                    <div
                        className={classes.playbackPosition}
                        style={{
                            left: qXFromPos('.peaks', audio.currentTime, audio.duration)
                        }}
                    />

                    <div
                        className={classes.posSelector}
                        style={{
                            display: audio.selectingPos
                                ? 'block'
                                : 'none',
                            left: `${audio.posSelectX}px`
                        }}
                    />

                    {tracks.map((track, index) => (
                        <Track key={index} track={track} />
                    ))}

                    <div className={classes.currentTime}>
                        {secondsToTime2(audio.currentTime)}
                    </div>
                    <div className={classes.duration}>
                        {secondsToTime2(audio.duration)}
                    </div>
                </div>
            </div>
        </div>
    )
});
