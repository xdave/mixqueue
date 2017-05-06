import * as React from 'react';
import { Sheet } from 'react-jss';
import injectStyles from '../../util/jss';

export interface Props {
    textColor?: string;
}

export const colorSelector = (props: Props) => props.textColor || '#fff';

export const styles = {
    thinger: {
        backgroundColor: 'black',
        color: colorSelector
    }
};

export type Styles = Sheet<typeof styles>;

export const Stuff: React.SFC<Props & Styles> = ({ classes }) => (
    <div className={classes.thinger}>
        This is a test.
    </div>
);

export default injectStyles(styles)(Stuff);
