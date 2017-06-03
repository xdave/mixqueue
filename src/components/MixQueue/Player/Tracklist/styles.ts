import theme from '../../../../util/theme';

export default {
    paper: {
        margin: `${theme.spacing.unit}px`,
        padding: `${theme.spacing.unit}px`
    },
    tracklist: {
        composes: '$paper'
    },
    track: {
        fontWeight: 'bold'
    }
};
