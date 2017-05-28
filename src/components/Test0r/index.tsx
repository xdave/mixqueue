import * as React from 'react';
import { Link, Route, RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
// import { createStyleSheet, withStyles } from 'material-ui/styles';
import { injectSheet } from '../../util/jss';
import { connect } from 'react-redux';
import { State } from '../../types';
import * as audioActions from '../../actions/audio';
import * as uiActions from '../../actions/ui';

import MixList from './MixList';
import MixView from './Mix';
import { Sheet } from "react-jss";

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import { getMixes } from "../../selectors/archive";

const Grid = require('material-ui/Grid').default;
const Icon = require('material-ui/Icon').default;
const LibraryMusic = require('material-ui-icons/LibraryMusic').default;
const Typography = require("material-ui/Typography").default;
const Hidden = require('material-ui/Hidden').default;

const styleSheet = {
    root: {
        position: 'relative',
        marginTop: '64px',
        width: '100%'
    },
    appBar: {
        position: 'relative'
    },
    gridContainer: {
        alignItems: 'center'
    },
    icon: {
        color: '#fff',
        '& :visited': {
            textDecoration: 'none'
        }
    }
};

type Props = RouteComponentProps<any>;
const mapState = (state: State & Sheet<typeof styleSheet>, props: Props) => ({
    ...state,
    ...props,
    mixes: getMixes(state)
});

const mapActions = (dispatch: Dispatch<typeof audioActions>) => ({
    actions: bindActionCreators({ ...audioActions, ...uiActions }, dispatch)
});

const C = connect(mapState, mapActions);

const Test0r = C(({ match, mixes, ui, classes, actions }) => {
    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <Grid container className={classes.gridContainer}>
                        <Grid item>
                            <Link
                                to="/test/mixes"
                                className={classes.icon}
                                onClick={() => actions.setStop()}
                            >
                                <Icon>
                                    <LibraryMusic />
                                </Icon>
                            </Link>
                        </Grid>
                        <Hidden only={['sm', 'xs']}>
                            <Grid item>
                                <Typography type="title" colorInherit>
                                    MixQueue
                                </Typography>
                            </Grid>
                        </Hidden>
                        <Grid item style={{ marginLeft: 'auto' }}>
                            <Route path={`${match.path}/mixes/:id`} children={route => {
                                const params = route && route.match
                                    ? route.match.params
                                    : {};
                                const mix = mixes.find(m => m.identifier === params.id)
                                return (
                                    <Button
                                        primary
                                        raised
                                        onClick={() => actions.mixListToggle()}
                                        tabIndex={1}
                                        onBlur={() => setTimeout(() =>
                                            actions.mixListToggle(false), 150)
                                        }
                                    >
                                        {mix ? mix.title : 'Select a mix...'}
                                    </Button>
                                );
                            }} />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div style={{ display: ui.mixListVisible ? 'block' : 'none' }}>
                <Route path={`${match.path}/mixes`} component={MixList} />
            </div>
            <Route exact path={`${match.path}/mixes`} render={() => {
                return <div>No Mix loaded. :)</div>;
            }} />
            <Route path={`${match.path}/mixes/:id`} component={MixView} />
        </div>
    );
});

export default withRouter(injectSheet(styleSheet)(Test0r));
