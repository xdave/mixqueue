export type StyleProps = {
    peaks: string;
}

export const styles = {
    peaksContainer: {
        position: 'relative',
        width: '100%',
        height: '80px',
        background: {
            color: 'rgba(0,43,89,0.75)'
        }
    },
    peaks: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        width: '100%',
    },
    controlsContainer: {
        position: 'absolute',
        height: '100%'
    },
    controls: {
        position: 'absolute',
        top: 'calc(50% - 10px)',
        height: '20px',
        '& svg': {
            color: '#fff'
        },
        '& button': {
            height: '20px'
        }
    },
    playbackPosition: {
        position: 'absolute',
        borderLeft: '1px dashed white',
        height: '100%',
    },
    time: {
        color: 'rgba(255, 255, 255,0.6)',
        fontFamily: 'monospace',
        fontSize: '9px'
    },
    currentTime: {
        composes: '$time',
        position: 'absolute',
        bottom: '0px',
    },
    duration: {
        composes: '$time',
        position: 'absolute',
        bottom: '0px',
        right: '0px',
    },
    posSelector: {
        position: 'absolute',
        borderLeft: '1px dotted white',
        height: '100%'
    },
    posSelectTime: {
        composes: '$time',
        position: 'absolute',
        top: 'calc(50% - 4.5px)',
        fontFamily: 'monospace',
        fontSize: '9px'
    }
};
