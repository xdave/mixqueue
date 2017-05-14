import * as React from 'react';
import { connectWithStyle } from '../../util/jss';
import { State } from "../../types/index";
import { getPeaksImage, getXFromPos, setPosFromX } from "../../util/player";
import { getActiveMix } from "../../selectors/audio";
import * as actions from '../../actions/audio';
import { Dispatch } from "redux";
import { bindActionCreators } from "redux";

import PeakTrack from './PeakTrack';

let ref: HTMLDivElement;

const styles = {
    peaks: {
        backgroundColor: 'rgb(20,74,160)',
        position: 'relative',
        width: '100%',
        height: '100px'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    position: {
        position: 'absolute',
        top: '0px',
        color: '#fff',
        width: '0px',
        height: '100%',
        borderRight: '1px dashed rgba(255,255,255,0.5)',
        left: (props: { currentTime: number, duration: number }) =>
            getXFromPos(ref, props.currentTime, props.duration),
    },
    positionSelect: {
        display: ({ selectingPos }: { selectingPos: boolean }) =>
            selectingPos ? 'block' : 'none',
        position: 'absolute',
        top: '0px',
        color: '#fff',
        width: '0px',
        height: '100%',
        borderRight: '1px solid white',
        left: (props: { posSelectX: number }) =>
            `${props.posSelectX}px`
    }
};

const mapState = (state: State) => ({
    mix: getActiveMix(state) || { files: [], id: '', cueSheet: { tracks: [] } },
    currentTime: state.audio.currentTime,
    duration: state.audio.duration,
    selectingPos: state.audio.selectingPos,
    posSelectX: state.audio.posSelectX
});

const mapActions = (dispatch: Dispatch<actions.AudioAction>) =>
    bindActionCreators({ ...actions }, dispatch);

const C = connectWithStyle(styles, mapState, mapActions);

export default C(({ classes, mix, duration, ...actions }) => {
    return (
        <div
            ref={el => ref = el}
            className={classes.peaks}
            onClick={mix.id && setPosFromX(duration, actions.setCurrentTime) || undefined}
            onMouseMove={e => {
                actions.setPosSelectionX(e.clientX - e.currentTarget.getBoundingClientRect().left);
                actions.setSelectingPos(true);
            }}
            onMouseOut={() => actions.setSelectingPos(false)}
        >
            <img className={classes.image}
                src={getPeaksImage(mix.files, mix.id)}
            />
            <div className={classes.position} />
            <div className={classes.positionSelect} />
            {mix.cueSheet.tracks.map(track =>
                <PeakTrack
                    key={`peak-track-${track.number}`}
                    track={track}
                    tracks={mix.cueSheet.tracks}
                    parentNode={ref}
                />
            )}
        </div>
    );
});
