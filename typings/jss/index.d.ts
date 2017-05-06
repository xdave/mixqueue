declare module 'jss' {
    export interface Middleware {

    }
    export interface JSS {
        use(middleware: Middleware): void;

    }
    export function create(): JSS;
}
