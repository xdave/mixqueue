import * as React from 'react';
import { connect } from '../../util/jss';
import { NavLink as RouterLink } from 'react-router-dom';

type Props = {
    to: string
    color?: string;
};

const styles = {
    link: {
        color: ({ color }: Props) => color || '#fff',
        textDecoration: 'none',
        '& :visited': {
            'text-decoration': 'none'
        }
    },
    active: {
        fontWeight: 'bold'
    }
}

const mapState = (_: any, props: Props) => ({
    ...props
});

const C = connect(styles, mapState);

const Link = C(({ children, to, classes }) => (
    <RouterLink
        to={to}
        className={classes.link}
        activeClassName={classes.active}
    >
        {children}
    </RouterLink>
));

export default Link;
