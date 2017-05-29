import * as React from 'react';
import { connect } from 'react-redux';
import { injectCSS } from '../../util/jss';
import withWidth from 'material-ui/utils/withWidth';

import { styles } from "./styles";
// import { Model } from "./Model";
// import { Controller } from "./Controller";
import { ViewModel } from './ViewModel';

const noop = () => ({});

const C = connect(noop, noop, ViewModel);

const View = C(({ classes, width, msg }) => (
    <div>
        <p className={classes.foo}>{msg}</p>
        <p>current media breakpoint width: {width}</p>
    </div>
));

export default withWidth()(injectCSS(styles)(View));
