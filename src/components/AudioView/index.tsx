import * as React from 'react';
import { connect } from 'react-redux';
import { State, Track, Mix } from '../../types';
import Tracklist from '../Tracklist';
import Player from "../Player/index";
import Mixes from "../Mixes/index";

export type Props = {
    mixes: Mix[];
    activeMixes: Mix[];
    activeTracks: Track[]
};

export type AudioViewType = React.SFC<Props>;

export const AudioView: AudioViewType = props => {
    const {
        activeMixes,
        activeTracks
    } = props;

    return (
        <div>
            <Mixes />
            {activeMixes.map(mix =>
                <div key={`active-mix-${mix.id}`}>
                    <Player />
                    {activeTracks.map(track =>
                        <p key={`active-track-${mix.id}-${track.title}`}>
                            {track.number}{' '}{track.title}
                        </p>
                    )}
                    <Tracklist />
                </div>
            )}
        </div>
    );
};

export const mapState = (state: State) => ({
    activeMixes: state.audio.activeMixes,
    activeTracks: state.audio.activeTracks
});

export default connect(mapState)(AudioView);
