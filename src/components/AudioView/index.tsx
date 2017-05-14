import * as React from 'react';
import { connectWithStyle } from '../../util/jss';
import { State } from '../../types';
import Tracklist from '../Tracklist';
import Player from "../Player/index";
import Mixes from "../Mixes/index";
import { RouteComponentProps } from "react-router";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
const Grid = require('material-ui/Grid').default;
const Typography = require("material-ui/Typography").default;
const Icon = require('material-ui/Icon').default;
const LibraryMusic = require('material-ui-icons/LibraryMusic').default;

const styles: React.CSSProperties = {
    root: {
        position: 'relative',
        marginTop: '82px',
        width: '100%'
    },
    appBar: {

    }
};

export const mapState = (_: State, props: RouteComponentProps<{}>) => ({
    ...props
});

export default connectWithStyle(styles, mapState)(props => (
    <div className={props.classes.root}>
        <AppBar className={props.classes.appBar}>
            <Toolbar>
                <Grid container style={{ alignItems: 'center', }}>
                    <Grid item>
                        <Icon>
                            <LibraryMusic />
                        </Icon>
                    </Grid>
                    <Grid item>
                        <Typography type="title" colorInherit>
                            MixQueue
                            </Typography>
                    </Grid>
                    <Grid item style={{ marginLeft: 'auto' }}>
                        <Mixes />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        <Player />
        <Tracklist />
    </div>
));
