import * as React from 'react';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import withWidth from 'material-ui/utils/withWidth';
import { injectCSS } from "../../../util/jss";
import Preload from "../../util/Preload";
import Link from "../../util/Link";
import Stylesheet from './Stylesheet';
import { Model } from './Model';
import { ViewModel } from "./ViewModel";
import { Controller } from "./Controller";
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import ScrollToItem from "../../util/ScrollToItem";
const Grid = require('material-ui/Grid').default;

const C = connect(Model, Controller, ViewModel);

export const View = C(({ classes, visible, mixId, mixes, preload }) => {
    return (
        <Preload wait preload={preload(mixes)}>
            {visible && (
                <Grid container className={classes.mixList}>
                    <Grid item>
                        <Paper>
                            <ScrollToItem
                                itemSelector={classes.active}
                                setHeight={() => `${window.innerHeight / 2}px`}
                            >
                                <List>
                                    {mixes.map(mix => (
                                        <Link
                                            key={`mixlink-${mix.identifier}`}
                                            to={`/${mix.identifier}`}
                                            color="#000"
                                        >
                                            <ListItem
                                                key={`mixlistitem-${mix.identifier}`}
                                                button
                                                className={classNames({
                                                    [classes.title]: true,
                                                    [classes.active]: mixId === mix.identifier
                                                })}
                                            >
                                                {mix.title}
                                            </ListItem>
                                        </Link>
                                    ))}
                                </List>
                            </ScrollToItem>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Preload>
    )
});

export default withWidth()(injectCSS(Stylesheet)(View));
