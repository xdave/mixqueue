import * as React from 'react';
import { connect } from "../../../../util/jss";
import { Preload } from "../../../util/Preload";
import { MixSearchResult } from "../../../../types/index";
import Stylesheet from './Stylesheet';
import { ViewModel } from './ViewModel';
import { Actions, Controller } from './Controller';

import Button from 'material-ui/Button';

const C = connect(Stylesheet, ViewModel, Controller);

const preload = (actions: Partial<Actions>, id: string, mixes: MixSearchResult[]) =>
    async () => {
        const [mix] = mixes.filter(m => m.identifier === id);
        if (id && !mix && actions.searchFetch) {
            return await actions.searchFetch();
        }
    };

export const View = C(({ mixId, mixes, actions, classes }) => {
    const [mix] = mixes.filter(m => m.identifier === mixId);
    const title = mix ? mix.title : 'Select a mix...';
    const preloader = preload(actions.archive, mixId, mixes);

    return (
        <Preload key={`mix-selector-${mixId}`} preload={preloader}>
            <Button
                raised
                primary
                onClick={() => actions.ui.mixListToggle()}
                onBlur={() => setTimeout(() =>
                    actions.ui.mixListToggle(false), 100)}
            >
                <span className={classes.title}>
                    {title}
                </span>
            </Button>
        </Preload>
    )
});

export default View;
