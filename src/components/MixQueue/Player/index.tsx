import * as React from 'react';
import { connect } from 'react-redux';
import { injectCSS } from '../../../util/jss';

import Paper from 'material-ui/Paper';
import Peaks from './Peaks';
import { Preload } from "../../util/Preload";

// import Tracklist from './Tracklist';

import { styles } from './styles';
import { Model } from "./Model";
import { Controller } from "./Controller";
import { ViewModel } from "./ViewModel";
import { withRouter } from "react-router-dom";

const C = connect(Model, Controller, ViewModel);

const View = C(({ classes, archive, preload, match }) => {
    const { mix } = archive;
    const key = `player-${mix ? mix.metadata.identifier : 'nomix'}`;
    return (
        <div>
            <Preload key={key} preload={preload}>
                <Paper className={classes.paper}>
                    <Peaks mixId={match.params.mixId} />
                </Paper>
            </Preload>
            {/*<Tracklist mixId={match.params.mixId} />*/}
        </div>
    )
});

export default withRouter(injectCSS(styles)(View));
