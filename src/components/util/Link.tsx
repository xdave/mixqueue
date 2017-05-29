import * as React from 'react';
import { injectCSS } from '../../util/jss';
import { NavLink as RouterLink } from 'react-router-dom';
import { Sheet } from "react-jss";

type Props = Sheet<typeof styles> & {
    to: string
    color?: string;
};

const styles = {
    link: {
        color: ({ color }: { color?: string }) => color || '#fff',
        textDecoration: 'none',
        '& :visited': {
            'text-decoration': 'none'
        }
    },
    active: {
        fontWeight: 'bold'
    }
}

type Type = React.SFC<Props>;
const Link: Type = ({ children, to, classes }) => (
    <RouterLink
        to={to}
        className={classes.link}
        activeClassName={classes.active}
    >
        {children}
    </RouterLink>
);

export default injectCSS(styles)(Link);
