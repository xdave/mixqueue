import { Sheet } from "react-jss";
import { State } from "../../../types/index";
import styles from './Stylesheet';

export type Props = Sheet<typeof styles> & {
    width: string;
}

export const Model = (state: State) => state;
