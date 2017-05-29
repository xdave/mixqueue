declare module 'material-ui/utils/withWidth' {
    import { Component, ComponentClass } from "react-redux";

    export type WidthProps = {
        width: string;
    }

    export default function withWidth():
        <P extends {}>(component: Component<WidthProps & P>) =>
            ComponentClass<P>;
}
