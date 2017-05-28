import * as React from 'react';
import { connect } from "../../../util/jss";
import { MixSearchResult } from "../../../types/index";
import Preload from "../../util/Preload/index";
import Link from "../../util/Link";
import { Stylesheet } from './Stylesheet';
import { ViewModel } from "./ViewModel";
import { Controller, Actions } from "./Controller";
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
const Grid = require('material-ui/Grid').default;

const C = connect(Stylesheet, ViewModel, Controller);

const preload = (mixes: MixSearchResult[], actions: Partial<Actions>) => async () => {
    if (mixes.length === 0 && actions.searchFetch) {
        return actions.searchFetch();
    }
};

export const View = C(({ classes, visible, mixes, actions }) => {
    return visible ? (
        <Preload wait preload={preload(mixes, actions.archive)}>
            <Grid container className={classes.mixList}>
                <Grid item>
                    <Paper>
                        <List>
                            {mixes.map(mix => (
                                <Link to={`/${mix.identifier}`} color="#000">
                                    <ListItem button>
                                        {mix.title}
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Preload>
    ) : <div />
});

export default View;
