import * as React from 'react';
import { connect } from 'react-redux';
import { css } from 'aphrodite';
import { styles } from "./styles";
import { State, Mix, Track } from "../../types/index";
import * as actions from '../../actions/audio';
import { AudioControl } from "../../util/audio";

const PEAKS_WIDTH = 1000;
const PEAKS_HEIGHT = 125;
const MARKER_WIDTH = 1;

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
        const divX = div.getBoundingClientRect().width;

        const x = e.clientX - 8; // I don't know why '8'... yet.
        const factor = x / divX;
        const time = factor * props.duration;
        props.setCurrentTime(time);
    };

interface Props {
    currentTime: number;
    activeMixes: Mix[];
    activeTracks: Track[];
    control: AudioControl;
    playing: boolean;
    duration: number;
    seeking: boolean;
}

const mapState = (state: State) => ({
    currentTime: state.audio.currentTime,
    activeMixes: state.audio.activeMixes,
    activeTracks: state.audio.activeTracks,
    control: state.audio.control,
    playing: state.audio.playing,
    duration: state.audio.duration,
    seeking: state.audio.seeking
});

type PlayerType = React.SFC<Props & typeof actions>;
export const Player: PlayerType = props => (
    <div>
        {props.activeMixes.map(mix =>
            <div key={`player-element-${mix.id}`}>
                <button onClick={() => props.setPlaying(!props.playing)}>
                    Play/Pause
                </button>
                <input
                    className={css(styles.player)}
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
                    {mix.files
                        .filter(f => /png/i.test(f.format))
                        .map(f => (
                            <div key={`peak-file-${f.name}`}>
                                <style>
                                    .peaks-image {`{
                                        background-color: rgb(20,74,160);
                                        width: ${PEAKS_WIDTH}px;
                                        height: ${PEAKS_HEIGHT}px;
                                        background-image: url("https://archive.org/download/${mix.id}/${f.name}");
                                        background-size: ${PEAKS_WIDTH}px ${PEAKS_HEIGHT}px;
                                        background-repeat: no-repeat;
                                    }
                                    .peaks-image .track {
                                        display: inline-block;
                                        color: white;
                                        height: 100%;
                                    }
                                    .peaks-image .track:hover {
                                        background-color: rgba(37,99,198,.5) !important;
                                    }`}
                                </style>
                                <div
                                    className="peaks-image"
                                    onClick={setPosFromX(props)}
                                >
                                    {props.duration > 0 && mix.cueSheet.tracks.map(track => (
                                        <div
                                            className="track"
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
                        ))
                    }
                </div>
            </div>
        )}
    </div>
);

export default connect(mapState, { ...actions })(Player);
