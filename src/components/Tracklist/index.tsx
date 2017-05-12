import * as React from 'react';
import { connect } from 'react-redux';
import { State, Mix } from '../../types';
import * as audioActions from '../../actions/audio';

export type TracklistState = {
    activeMixes: Mix[];
} & typeof audioActions;

export const mapState = (state: State) => ({
    activeMixes: state.audio.activeMixes
});

export const mapDispatch = {
    ...audioActions
};

export type Type = React.SFC<TracklistState>;

export const Tracklist: Type = ({ activeMixes, ...actions }) => {
    return (
        <div>
            {activeMixes.map(mix => mix.cueSheet.tracks.map(track => {
                return (
                    <div key={`track-selection-${track.title}`}>
                        <button
                            onClick={() => {
                                actions.setCurrentTime(track.time);
                            }}
                        >
                            {track.number} [{track.timeDisplay}]: {track.title}
                        </button>
                    </div>
                );
            }))}
        </div>
    );
};

export default connect(mapState, mapDispatch)(Tracklist);
