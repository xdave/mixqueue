import * as React from 'react';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { injectCSS } from '../../../../util/jss';

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';

import Model from './Model';
import Controller from './Controller';
import ViewModel from './ViewModel';
import styles from './styles';
import { zeroPad, secondsToTime2 } from "../../../../util/player";
import ScrollToItem from "../../../util/ScrollToItem";

const C = connect(Model, Controller, ViewModel);

const View = C(({ classes, actions, track, tracks }) => tracks.length > 0 && (
    <Paper className={classNames(classes.paper, classes.tracklist)}>
        <ScrollToItem
            itemSelector={classes.track}
            setHeight={() => `${window.innerHeight - (182)}px`}
        >
            <List>
                {track && tracks.map((t, index) => (
                    <ListItem
                        button
                        key={`track-${index}`}
                        className={classNames({
                            [classes.track]: t.number === track.number
                        })}
                        onClick={() => actions.setCurrentTime(t.time)}
                    >
                        <span>[{secondsToTime2(t.time)}]</span>
                        &nbsp;
                        <span>{zeroPad(t.number)}.</span>
                        &nbsp;
                        <span>{t.title}</span>
                    </ListItem>
                ))}
            </List>
        </ScrollToItem>
    </Paper>
) || <div />);

export default injectCSS(styles)(View);
