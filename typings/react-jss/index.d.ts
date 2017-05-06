declare module 'react-jss' {
    import { ComponentClass, CSSProperties, SFC } from 'react';
    import { JSS } from 'jss';

    type Component<P> = ComponentClass<P> | SFC<P>;

    export interface SheetDef {
        [className: string]: CSSProperties;
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
                ComponentClass<P>;
    }

    export function create(jss: JSS): ComponentDecorator;
}
