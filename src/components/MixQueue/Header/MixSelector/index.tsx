import * as React from 'react';
import { connect } from "react-redux";
import withWidth from 'material-ui/utils/withWidth';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { injectCSS } from "../../../../util/jss";

import styles from './Stylesheet';
import { Model } from './Model';
import { Controller } from './Controller';
import { ViewModel } from './ViewModel';

const C = connect(Model, Controller, ViewModel);

export const View = C(({ mix, actions, width }) => {
    const title = mix ? mix.metadata.title : 'Select a mix...';

    return (
        <Button
            raised
            primary
            tabIndex={`0` as any}
            onClick={() => actions.mixListToggle({ value: true })}
            onBlur={() => {
                setTimeout(() =>{
                    actions.mixListToggle({ value: false });
                }, 222);
            }}
        >
            <Typography
                type={width == 'xs' ? 'caption' : 'body2'}
                colorInherit
            >
                {title}
            </Typography>
        </Button>
    )
});

export default withWidth()(injectCSS(styles)(View));
