import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { State, Mix, Track } from "../../types/index";
import * as actions from '../../actions/audio';
import { getPeaksImage } from "../../util/player";
import { connectWithStyle } from '../../util/jss';
const IconButton = require('material-ui/IconButton').default;
const PlayArrow = require('material-ui-icons/PlayArrow').default;
const Pause = require('material-ui-icons/Pause').default;
const Stop = require('material-ui-icons/Stop').default;
const SkipPrevious = require('material-ui-icons/SkipPrevious').default;
const SkipNext = require('material-ui-icons/SkipNext').default;
const { CircularProgress } = require('material-ui/Progress');

const PEAKS_WIDTH = 800;
const PEAKS_HEIGHT = 100;
const MARKER_WIDTH = 1;

interface Props {
    currentTime: number;
    activeMixes: Mix[];
    activeTracks: Track[];
    playing: boolean;
    duration: number;
    seeking: boolean;
    waiting: boolean;
}

const styleSheet: React.CSSProperties = {
    progress: {
    },
    slider: { width: '100%' },
    peaks: {
        backgroundColor: 'rgb(20,74,160)',
        width: `${PEAKS_WIDTH}px`,
        height: `${PEAKS_HEIGHT}px`,
        'background-image': ({ activeMixes }: Props) => {
            const [mix = { files: [], id: '' }] = activeMixes;
            return `url("${getPeaksImage(mix.files, mix.id)}")`;
        },
        backgroundSize: `${PEAKS_WIDTH}px ${PEAKS_HEIGHT}px`,
        backgroundRepeat: `no-repeat`
    },
    track: {
        display: 'inline-block',
        color: 'white',
        height: '100%',
        '&:hover': {
            'background-color': 'rgba(37, 99, 198, .5) !important'
        }
    }
};

const secondsToTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds - (hrs * 3600)) / 60);
    const secs = totalSeconds - (hrs * 3600) - (mins * 60);
    const secsFixed = secs.toFixed(3);

    const hrsStr = hrs < 10 ? `0${hrs}` : hrs;
    const minsStr = mins < 10 ? `0${mins}` : mins;
    const secsStr = (secs < 10 ? `0${secsFixed}` : secsFixed);
    return `${hrsStr}:${minsStr}:${secsStr}`;
};

const getTrackLen = (track: Track, tracks: Track[], duration: number) => {
    const next: Track | undefined = tracks[track.number];
    const nt = next ? next.time : duration;
    return nt - track.time;
};

const getTrackWidth = (track: Track, tracks: Track[], duration: number) => {
    const len = getTrackLen(track, tracks, duration);
    const factor = len / duration;
    return (factor * PEAKS_WIDTH) - MARKER_WIDTH;
};

const getTrackPosWidth = (track: Track, tracks: Track[], currentTime: number, duration: number) => {
    const start = currentTime - track.time;
    const len = getTrackLen(track, tracks, duration);
    const width = getTrackWidth(track, tracks, duration);
    return (start / len) * width;
};

const setPosFromX = (props: Props & typeof actions) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
        const div = e.currentTarget;
        const { width } = div.getBoundingClientRect();

        const x = e.clientX - 8; // I don't know why '8'... yet.
        const factor = x / width;
        const time = factor * props.duration;
        props.setCurrentTime(time);
    };

const mapState = (state: State) => ({
    currentTime: state.audio.currentTime,
    activeMixes: state.audio.activeMixes,
    activeTracks: state.audio.activeTracks,
    playing: state.audio.playing,
    duration: state.audio.duration,
    seeking: state.audio.seeking,
    waiting: state.audio.waiting
});

const mapActions = (dispatch: Dispatch<actions.AudioAction>) =>
    bindActionCreators({ ...actions }, dispatch);

export default connectWithStyle(styleSheet, mapState, mapActions)(props => (
    <div>
        {props.activeMixes.map(mix =>
            <div key={`player-element-${mix.id}`}>
                <IconButton onTouchTap={() => props.skipPrevious()}>
                    <SkipPrevious />
                </IconButton>
                <IconButton onTouchTap={() => props.setPlaying(!props.playing)}>
                    {props.playing ? <Pause /> : <PlayArrow />}
                </IconButton>
                <IconButton onTouchTap={() => props.setStop()}>
                    <Stop />
                </IconButton>
                <IconButton onTouchTap={() => props.skipNext()}>
                    <SkipNext />
                </IconButton>
                {props.waiting && <CircularProgress size={20} />}
                <input
                    className={props.classes.slider}
                    type="range"
                    min={0}
                    max={props.duration}
                    value={props.currentTime}
                    onMouseDown={() => {
                        props.seekStart();
                    }}
                    onMouseMove={e => {
                        const time = parseFloat(e.currentTarget.value);
                        props.setCurrentTimeDone(time);
                    }}
                    onMouseUp={e => {
                        const time = parseFloat(e.currentTarget.value);
                        props.setCurrentTimeDone(time);
                        props.seek(time);
                    }}
                />
                {secondsToTime(props.currentTime)}
                /
                {secondsToTime(props.duration)}

                <div className="peaks">
                    <div key={`peak-file-${mix.id}`}>
                        <div
                            className={props.classes.peaks}
                            onClick={setPosFromX(props)}
                        >
                            {props.duration > 0 && mix.cueSheet.tracks.map(track => (
                                <div
                                    className={props.classes.track}
                                    title={`${track.title}`}
                                    key={`peak-track-${track.title}`}
                                    style={{
                                        backgroundColor: track.title === props.activeTracks[0].title
                                            ? 'rgba(37,99,198,.35)' : 'rgba(0,0,0,0)',
                                        width: `${getTrackWidth(track, mix.cueSheet.tracks, props.duration)}px`,
                                        borderLeft: `${MARKER_WIDTH}px dotted rgba(255,255,255,0.3)`
                                    }}>
                                    <div style={{ float: 'left', display: 'absolute' }}>
                                        {track.number}
                                    </div>
                                    <div style={{
                                        display: 'absolute',
                                        height: '100%',
                                        width: track.title === props.activeTracks[0].title
                                            ? `${getTrackPosWidth(track, mix.cueSheet.tracks, props.currentTime, props.duration)}px`
                                            : '0px',
                                        borderRight: track.title === props.activeTracks[0].title
                                            ? '1px dashed rgba(255,255,255,0.5)'
                                            : 'none',
                                        marginLeft: '-1px'
                                    }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
));
