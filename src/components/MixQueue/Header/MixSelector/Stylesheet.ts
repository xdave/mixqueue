type Props = {
    width: string;
}

export default {
    title: {
        'font-size': (props: Props) => {
            if (props.width === 'xs') {
                return '7.95px';
            } else {
                return '12px'
            }
        },
        fontWeight: 'bold'
    }
};
