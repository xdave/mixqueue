import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from '../../../util/jss';
import { State, Track, MixInfo } from '../../../types';
import * as archiveActions from '../../../actions/archive';
import * as audioActions from '../../../actions/audio';
import { RouteComponentProps } from "react-router-dom";
import { routerAction } from 'react-router-redux';
import { getMixById, getTrackByNumber } from "../../../selectors/archive";

type Action = archiveActions.Type & audioActions.AudioAction;
type Actions
    = typeof archiveActions
    & typeof audioActions
    & typeof routerAction;

const styles = {};

type Props = RouteComponentProps<{ id: string; track: string }>;

const mapState = (state: State, props: Props) => ({
    state,
    mix: getMixById(state, props.match.params.id),
    track: getTrackByNumber(state, props.match.params.id, props.match.params.track),
    ...props
});

const mapActions = (dispatch: Dispatch<Action>) => ({
    actions: bindActionCreators({
        ...archiveActions,
        ...audioActions,
        ...routerAction
    }, dispatch)
});

const C = connect(styles, mapState, mapActions);

const setTrack = (track: Track, mix: MixInfo, actions: Actions, state: State) => {
    const { currentTime, duration } = state.audio;
    const next = mix[mix.metadata.identifier].tracks[track.number];
    const nextTime = next ? next.time : duration;

    if (!isFinite(currentTime) || !isFinite(duration)) {
        return;
    }
    if (duration <= currentTime) {
        return;
    }
    if (track.time >= duration) {
        return;
    }
    if (currentTime >= nextTime) {
        if (state.router.location && actions.replace) {
            console.log(actions.replace(state.router.location.pathname.replace(/[0-9]+$/, `${next.number}`)))
        }
        // routerAction.replace
        //return;
    }
    if ((currentTime < track.time || nextTime < currentTime)) {
        actions.setCurrentTime(track.time);
    }
};

export const TrackView = C(({ mix, track, actions, state }) => {
    // mix && track && setTrack(track, mix, actions, state);

    return (
        <div>
            <p>{track && track.title}</p>
            <input
                value={state.audio.currentTime}
                type="range"
                min={0}
                max={state.audio.duration}
                onMouseDown={() => actions.seekStart()}
                onMouseUp={e => actions.seek(parseInt(e.currentTarget.value, 10))}
            /> {state.audio.currentTime}
        </div>
    );
});

export default TrackView;

