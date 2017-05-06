declare module 'react-jss' {
    import * as React from 'react';
    import { JSS } from 'jss';

    type ComponentClass<P> = React.ComponentClass<P>;
    type StatelessComponent<P> = React.StatelessComponent<P>;
    type Component<P> = ComponentClass<P> | StatelessComponent<P>;

    export interface SheetDef {
        [className: string]: React.CSSProperties;
    }

    export type Classes<T extends SheetDef>
        = { [P in keyof T]: string; }
        & { [index: string]: string; };

    export interface Sheet<T extends SheetDef> {
        classes: Classes<T>;
    }

    export interface ComponentDecorator {
        <CSSClasses extends SheetDef>(cssClasses: CSSClasses):
            <P = {}>(component: Component<P & Sheet<CSSClasses>>) =>
                ComponentClass<P>;
    }

    export function create(jss: JSS): ComponentDecorator;
}
