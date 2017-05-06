declare module 'react-jss' {
    import * as React from 'react';
    import { JSS } from 'jss';

    type Component<P> = React.ComponentClass<P> | React.SFC<P>;

    export interface SheetDef {
        [className: string]: React.CSSProperties;
    }

    export type Classes<T>
        = { [P in keyof T]: string; }
        & { [index: string]: string; };

    export interface Sheet<T extends SheetDef> {
        classes: Classes<T>;
    }

    export interface ComponentDecorator {
        <CSSClasses extends SheetDef>(cssClasses: CSSClasses):
            <P extends any>(component: Component<P & Sheet<CSSClasses>>) =>
                React.ComponentClass<P>;
    }

    export function create(jss: JSS): ComponentDecorator;
}
