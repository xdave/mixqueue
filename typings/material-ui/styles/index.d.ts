declare module 'material-ui/styles' {
    import { ComponentClass, SFC } from 'react';
    import { SheetDef, Sheet } from "react-jss";

    type Component<P> = ComponentClass<P> | SFC<P>;

    export interface ThemedCSS<R> {
        (theme: any): R;
    }

    export interface CreateStyleSheet {
        <CSS extends SheetDef>(name: string, classes: ThemedCSS<CSS>): CSS;
        <CSS extends SheetDef>(name: string, classes: CSS): CSS;
    }

    export interface WithStyles {
        <CSS extends SheetDef>(css: CSS):
            <P extends {}>(component: Component<Sheet<CSS> & P>) =>
                ComponentClass<P>;
    }

    export const createStyleSheet: CreateStyleSheet;
    export const withStyles: WithStyles;
}
