declare module 'jss' {
    export type Middleware = any;

    export interface JSS {
        use(middleware: Middleware): void;

    }
    export function create(): JSS;
}
