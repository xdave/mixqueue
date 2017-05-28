declare module 'jss' {
    export type Middleware = any;
	export type Preset = any;

    export interface JSS {
        use(middleware: Middleware): void;

    }
    export function create(preset?: Preset): JSS;
}
