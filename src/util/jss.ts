import {
    connect,
    Component,
    MapStateToPropsParam,
    MapDispatchToPropsParam
} from 'react-redux';
import { create as createJss } from 'jss';
import { create as createInjectSheet, Sheet, SheetDef } from 'react-jss';
import nested from 'jss-nested';
import compose from 'jss-compose';
import camelCase from 'jss-camel-case';
import vendorPrefixer from 'jss-vendor-prefixer';

// JSS Plugin Required Order
// jss - cache
// jss - global
// jss - extend
// jss - nested
// jss - compose
// jss - camel -case
// jss - default-unit
// jss - expand
// jss - vendor - prefixer
// jss - props - sort
// jss - isolate

const jss = createJss();
jss.use(nested());
jss.use(compose());
jss.use(camelCase());
jss.use(vendorPrefixer());

export type StyledSFC<CSS extends SheetDef, Props = {}, Dispatch = {}>
    = React.SFC<Props & Dispatch & Sheet<CSS>>;

export const injectSheet = createInjectSheet(jss);

export const connectWithStyle = <CSS extends SheetDef, State, Actions, Props>(
    css: CSS,
    state?: MapStateToPropsParam<State, Props> | null,
    actions?: MapDispatchToPropsParam<Actions, Props> | null) =>
    (component: Component<State & Actions & Props & Sheet<CSS>>) =>
        (state && !actions)
            ? connect(state)(injectSheet(css)(component))
            : (!state && actions)
                ? connect(null, actions)(injectSheet(css)(component))
                : (state && actions)
                    ? connect(state, actions)(injectSheet(css)(component))
                    : injectSheet(css)<State & Actions & Props>(component);

export default connectWithStyle;
