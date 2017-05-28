import * as React from 'react';
import { bindActionCreators, Dispatch } from "redux";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { connect } from "../../../util/jss";
import * as archiveActions from '../../../actions/archive';
import * as uiActions from '../../../actions/ui';
import { State } from "../../../types/index";
import { Preload } from "../../util/Preload/index";
import { getMixes } from "../../../selectors/archive";
const List = require('material-ui/List').default;
const { ListItem } = require('material-ui/List');
import ScrollToActive from '../../util/ScrollToActive';
import Paper from 'material-ui/Paper';

const styles = {
    paper: {
        position: 'fixed',
        right: '0px',
    },
    list: {
        height: '200px',
        overflowY: 'scroll'
    },
    link: {
        textDecoration: 'none',
        ['&:visited']: {
            color: 'inherit'
        }
    },
    activeLink: {
        fontWeight: 'bold'
    }
}

type Props = RouteComponentProps<any>;
const mapState = (state: State, props: Props) => ({
    mixes: getMixes(state),
    ...props
});
const mapActions = (dispatch: Dispatch<archiveActions.Type>) => ({
    actions: bindActionCreators({ ...archiveActions, ...uiActions }, dispatch)
});

const C = connect(styles, mapState, mapActions);

export const MixList = C(({ mixes, classes, actions, match }) => (
    <Preload preload={() => actions.searchFetch()} wait={true}>
        <Paper className={classes.paper}>
            <List className={classes.list}>
                {mixes.map(mix => (
                    <NavLink
                        name={`${match.path}/${mix.identifier}`}
                        to={`${match.path}/${mix.identifier}`}
                        className={classes.link}
                        activeClassName={classes.activeLink}
                    >
                        <ScrollToActive containerClass={classes.list} activeClass={classes.activeLink}>
                            <ListItem
                                button
                                key={`mix-${mix.identifier}`}
                            >
                                {mix.title}
                            </ListItem>
                        </ScrollToActive>

                    </NavLink>
                ))}
            </List>
        </Paper>
    </Preload>
));

export default MixList;
