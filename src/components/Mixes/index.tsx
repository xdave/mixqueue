import * as React from 'react';
import { connect } from 'react-redux';
import { Mix, State } from "../../types/index";
import { getMixes } from "../../selectors/audio";
import * as audioActions from '../../actions/audio';

const Button = require('material-ui/Button').default;

interface Props {
    mixes: Mix[];
    activeMixes: Mix[];
}

const mapState = (state: State) => ({
    mixes: getMixes(state),
    activeMixes: state.audio.activeMixes
});

const mapDispatch = { ...audioActions };

type Type = React.SFC<Props & typeof audioActions>;
export const Mixes: Type = ({ mixes, activeMixes, ...props }) => (
    <ul>
        {mixes.map(mix =>
            <li key={`mix-selection-${mix.id}`}>
                <Button
                    raised={!!activeMixes.find(m => m.id === mix.id)}
                    onClick={async (e: any) => {
                        e.preventDefault();
                        const fetchedMix: Mix = await props.mixFetch(mix.id) as any;
                        props.setActiveMix(fetchedMix);
                        props.setActiveTrack(fetchedMix.cueSheet.tracks[0]);
                        props.setSource(fetchedMix.sources[0]);
                        return false;
                    }}
                >
                    {mix.title}
                </Button>
            </li>
        )}
    </ul>
);

export default connect(mapState, mapDispatch)(Mixes);
