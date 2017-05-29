type Props = {
    width: string;
}

export default {
    mixList: {
        position: 'absolute',
        justifyContent: 'flex-end',
        top: '45px',
        right: '0px',
        zIndex: 2
    },
    title: {
        'font-size': (props: Props) =>
            props.width === 'xs'
                ? '9px'
                : 'inherit'
    },
    active: {
        fontWeight: 'bold'
    }
};
