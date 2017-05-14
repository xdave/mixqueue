import * as React from 'react';
import { connect } from 'react-redux';
import { State, Mix, Track } from '../../types';
import * as audioActions from '../../actions/audio';
import { ListItem, ListItemIcon } from 'material-ui/List';
import { getActiveMix, getActiveTrack } from "../../selectors/audio";
import { secondsToTime, zeroPad } from "../../util/player";
const List = require('material-ui/List').default;
const MusicNote = require('material-ui-icons/MusicNote').default;
const Typography = require("material-ui/Typography").default;

export type TracklistState = {
    activeMix: Mix;
    activeTrack: Track;
} & typeof audioActions;

export const mapState = (state: State) => ({
    activeMix: getActiveMix(state),
    activeTrack: getActiveTrack(state)
});

export const mapDispatch = {
    ...audioActions
};

export type Type = React.SFC<TracklistState>;

export const Tracklist: Type = ({ activeMix, activeTrack, ...actions }) => {
    return (
        <List dense={true}>
            {activeMix && activeMix.cueSheet.tracks.map(track => (
                <ListItem
                    key={`track-selection-${track.title}`}
                    button
                    onClick={() => {
                        actions.setCurrentTime(track.time);
                    }}
                >
                    <ListItemIcon>
                        <MusicNote />
                    </ListItemIcon>
                    <Typography
                        type={activeTrack && activeTrack.number === track.number ? 'body2' : 'body1'}
                        colorInherit
                    >
                        <code>
                            {zeroPad(track.number)} [{secondsToTime(track.time)}] {track.title}
                        </code>
                    </Typography>
                </ListItem>
            ))}
        </List>
    );
};

export default connect(mapState, mapDispatch)(Tracklist);
