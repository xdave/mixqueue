import { State } from "../../../../types/index";
import styles from './Stylesheet';
import { Sheet } from "react-jss";

export type Props = Sheet<typeof styles> & {
    width: string;
}

export const Model = (state: State) => state;
