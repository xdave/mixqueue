import * as React from 'react';
import { connect } from 'react-redux';
import withWidth from 'material-ui/utils/withWidth';
import { injectCSS } from '../../../../../util/jss';
import { qXFromPos } from "../../../../../util/player";
import { styles } from './styles';

import { Model } from './Model';
import { Controller } from './Controller';
import { ViewModel } from './ViewModel';

const C = connect(Model, Controller, ViewModel);

const View = C(({ classes, track, audio }) => {
    return (
        <div
            className={classes.track}
            style={{ left: qXFromPos('.peaks', track.time, audio.duration) }}
        >
            <span className={classes.number}>
                {track.number}
            </span>
        </div>
    )
});

export default withWidth()(injectCSS(styles)(View))
