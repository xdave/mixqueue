import * as React from 'react';

type Props = {
    src: string;
    width?: number;
    height?: number;
    title?: string;
    alt?: string;
}

type Type = React.SFC<Props>;

export const SvgIcon: Type = props => {
    const {
        width = 20,
        height = 20,
        ...rest
    } = props;

    return <img width={width} height={height} {...rest} />;
};

export default SvgIcon;
