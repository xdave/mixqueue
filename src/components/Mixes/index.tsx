import * as React from 'react';
import { connect } from 'react-redux';
import { Mix, State } from "../../types/index";
import { getMixes, getActiveMix } from "../../selectors/audio";
import * as audioActions from '../../actions/audio';
import { Dispatch } from "redux";
import { bindActionCreators } from "redux";
import Button from 'material-ui/Button';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Drawer from "material-ui/Drawer";

const QueueMusic = require('material-ui-icons/QueueMusic').default;

const mapState = (state: State) => ({
    mixes: getMixes(state),
    activeMix: getActiveMix(state),
    mixMenuVisible: state.audio.mixMenuVisible
});

const mapDispatch = (dispatch: Dispatch<audioActions.AudioAction>) =>
    bindActionCreators({ ...audioActions }, dispatch);

const C = connect(mapState, mapDispatch);

export default C(({ mixes, activeMix, mixMenuVisible, ...props }) => {
    return (
        <div>
            <Button
                aria-controls="mix-menu"
                aria-haspopup="true"
                onClick={() => props.setMixMenuVisible(true)}
                primary
                raised
            >
                {activeMix && activeMix.title || 'Select a mix...'}
            </Button>
            <Drawer
                anchor="right"
                open={mixMenuVisible}
                onRequestClose={() => props.setMixMenuVisible(false)}
            >
                <div>
                    {mixes.map(mix => (
                        <ListItem
                            key={`mix-selection-${mix.id}`}
                            button
                            onClick={async (e: any) => {
                                e.preventDefault();
                                const fetchedMix: Mix = await props.mixFetch(mix.id) as any;
                                props.setMixMenuVisible(false);
                                props.setActiveMix(fetchedMix);
                                props.setActiveTrack(fetchedMix.cueSheet.tracks[0]);
                                props.setSource(fetchedMix.sources[0]);
                                return false;
                            }}
                        >
                            <ListItemIcon>
                                <QueueMusic />
                            </ListItemIcon>
                            <ListItemText primary={mix.title} />
                        </ListItem>
                    ))}
                </div>
            </Drawer>
        </div>
    );
});
