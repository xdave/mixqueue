declare module 'jss' {
    export type Middleware = any;

    export interface JSS {
        use(middleware: Middleware): void;
        createStyleSheet<T>(style: T): T;
    }

    export function create(): JSS;
}
