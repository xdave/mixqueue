import * as React from 'react';
import { connectWithStyle } from "../../util/jss";
import { State, Track } from "../../types/index";
import { getActiveTrack } from "../../selectors/audio";
import { getXFromPos, getTrackLen } from "../../util/player";

interface Props {
    currentTrack: Track;
    duration: number;
}

interface OwnProps {
    track: Track;
    tracks: Track[];
    parentNode: HTMLDivElement;
}

const styles = {
    peakTrack: {
        // fontSize: '0.5em',
        display: 'inline-block',
        position: 'absolute',
        top: '0px',
        color: '#fff',
        height: '100%',
        borderLeft: '1px dotted rgba(255,255,255,0.3)',
        'background-color': ({ track, currentTrack }: Props & OwnProps) => {
            if (track.title === currentTrack.title) {
                return 'rgba(37,99,198,.35)'
            }
            return 'rgba(0,0,0,0)'
        },
        left: ({ parentNode, track, duration }: Props & OwnProps) => {
            if (parentNode) {
                return getXFromPos(parentNode, track.time, duration);
            }
            return '0px';
        },
        width: ({ parentNode, track, tracks, duration }: Props & OwnProps) => {
            if (parentNode) {
                const peaksWidth = parentNode.getBoundingClientRect().width;
                const len = getTrackLen(track, tracks, duration);
                const factor = len / duration;
                return ((factor * peaksWidth) - 1) + 'px';
            }
        },
        '&:hover': {
            backgroundColor: 'rgba(37, 99, 198, .5)'
        }
    }
};

const mapState = (state: State, props: OwnProps) => ({
    duration: state.audio.duration,
    currentTrack: getActiveTrack(state) || {} as Track,
    ...props
});

const C = connectWithStyle(styles, mapState);

export default C(({ classes, track }) => (
    <div className={classes.peakTrack} title={track.title}>
        {track.number}
    </div>
));
