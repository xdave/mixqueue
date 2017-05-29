import {
    connect as reduxConnect,
    Component,
    ComponentClass,
    MapStateToPropsParam,
    MapDispatchToPropsParam
} from 'react-redux';
import { create as createJss } from 'jss';
import { create as createInjectSheet, Sheet, SheetDef } from 'react-jss';
import presetDefault from 'jss-preset-default';
import { withStyles } from "material-ui/styles";

export const important = <CSS extends SheetDef>(css: CSS): CSS => {
    return Object.assign({}, ...Object.keys(css).map(className => {
        const styles = css[className];
        return {
            [className]: Object.assign({}, ...Object.keys(styles).map(style => {
                const rule = styles[style];
                if (typeof rule === 'string') {
                    return { [style]: `${rule} !important` };
                } else if (typeof rule === 'function') {
                    return {
                        [style]: (props: any) => `${rule(props)} !important`
                    };
                }
                return { [style]: rule };
            }))
        };
    }));
};

const jss = createJss(presetDefault());

export const injectSheet = createInjectSheet(jss);

type StyleInjector = typeof injectSheet | typeof withStyles;

export const createConnector = (injector: StyleInjector) =>
    <CSS extends SheetDef, S, A, P>(
        css: CSS,
        state?: MapStateToPropsParam<S, P>,
        actions?: MapDispatchToPropsParam<A, P>) =>
        (component: Component<S & A & P & Sheet<CSS>>): ComponentClass<P> =>
            (reduxConnect as any)(state, actions)(
                injector(important(css))(component));

export const connectWithStyle = createConnector(injectSheet);
export const connectMui = createConnector(withStyles);

export const injectCSS = <CSS extends SheetDef>(css: CSS) =>
    <P>(component: Component<Sheet<CSS> & P>): ComponentClass<P> =>
        injectSheet(important(css))(component);

export { connectWithStyle as connect };

export default connectWithStyle;
