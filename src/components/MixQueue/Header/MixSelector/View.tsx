import * as React from 'react';
import { compose } from 'redux';
import { connect } from "react-redux";
import withWidth from 'material-ui/utils/withWidth';
import Button from 'material-ui/Button';
import { injectCSS } from "../../../../util/jss";
import { Preload } from "../../../util/Preload";

import styles from './Stylesheet';
import { Model } from './Model';
import { Controller } from './Controller';
import { ViewModel } from './ViewModel';


const C = connect(Model, Controller, ViewModel);

export const View = C(({ mixId, mixes, actions, preload, classes }) => {
    const mix = mixes.find(m => m.identifier === mixId);
    const title = mix ? mix.title : 'Select a mix...';

    return (
        <Preload key={`mix-selector-${mixId}`} preload={preload}>
            <Button
                raised
                primary
                onClick={() => actions.mixListToggle()}
                onBlur={() => setTimeout(() =>
                    actions.mixListToggle(false), 100)}
            >
                <span className={classes.title}>
                    {title}
                </span>
            </Button>
        </Preload>
    )
});

export default compose(withWidth(), injectCSS(styles))(View);
