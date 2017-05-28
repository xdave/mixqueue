declare module 'react-jss' {
    import { ComponentClass, SFC } from 'react';
    import { JSS } from 'jss';

    type Component<P> = ComponentClass<P> | SFC<P>;

    export interface SheetDef {
        [className: string]: any;
    }

    export type Classes<CSS>
        = {[P in keyof CSS]: string; }
        & { [index: string]: string; };

    export interface Sheet<CSS extends SheetDef> {
        classes: Classes<CSS>;
    }

    export function create(jss: JSS):
        <CSS extends SheetDef>(css: CSS) =>
            <P extends any>(component: Component<P>) =>
                Component<P>;
}
