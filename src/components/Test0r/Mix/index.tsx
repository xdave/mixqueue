import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from '../../../util/jss';
import { State } from '../../../types';
import * as archiveActions from '../../../actions/archive';
import * as audioActions from '../../../actions/audio';
import { RouteComponentProps } from "react-router-dom";
import { withRouter } from 'react-router';
import Preload from '../../util/Preload';
import { getMixById, getPeaks, getTitle, getTracks, getAudioSources, getCurrentTrack } from "../../../selectors/archive";
import { getPrettyTime, getPrettyDuration } from "../../../selectors/audio";
import { zeroPad, secondsToTime2 } from "../../../util/player";

type Action = archiveActions.Type & audioActions.AudioAction;

const styles = {
    peaksContainer: {
        width: '100%',
        height: '200px'
    },
    peaks: {
        'background-image':
            (props: { peaks: string }) => props.peaks ?
                `url("${props.peaks}")`
                : 'none',
        backgroundSize: '100% 100%',
        width: '100%',
        height: '100%'
    }
};

type Props = RouteComponentProps<{ id: string }>;

const mapState = (state: State, props: Props) => ({
    state,
    mix: getMixById(state, props.match.params.id),
    peaks: getPeaks(state, props.match.params.id),
    title: getTitle(state, props.match.params.id),
    tracks: getTracks(state, props.match.params.id),
    currentTrack: getCurrentTrack(state, props.match.params.id),
    time: getPrettyTime(state),
    duration: getPrettyDuration(state),
    srcs: getAudioSources(state, props.match.params.id),
    ...props
});

const mapActions = (dispatch: Dispatch<Action>) => ({
    actions: bindActionCreators({
        ...archiveActions,
        ...audioActions
    }, dispatch)
});

const C = connect(styles, mapState, mapActions);

export const MixView = C(props => {
    const {
        match,
        mix,
        title,
        tracks,
        currentTrack,
        time,
        duration,
        srcs,
        actions,
        classes
    } = props;

    const id = match.params.id;

    actions.setSource(srcs);

    return (
        <Preload key={id} preload={() => !mix && actions.metadataFetch(id)}>
            <h3>{title} [{duration}]</h3>
            <div className={classes.peaksContainer}>
                <div className={classes.peaks} />
            </div>
            <p>
                <span>{time} </span>
                <select onChange={e => actions.setCurrentTime(
                    tracks[e.currentTarget.selectedIndex].time)}>
                    {tracks.map(track => (
                        <option selected={track.number === currentTrack.number}>
                            <span>{zeroPad(track.number)}. </span>
                            <span>{track.title} </span>
                            <span>@ {secondsToTime2(track.time)} </span>
                        </option>
                    ))}
                </select>
            </p>
        </Preload>
    );
});

export default withRouter(MixView);

