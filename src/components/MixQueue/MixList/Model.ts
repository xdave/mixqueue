import { Sheet } from "react-jss";
import { State } from "../../../types/index";
import styles from './Stylesheet';
import { WidthProps } from 'material-ui/utils/withWidth';

export type Props = Sheet<typeof styles> & WidthProps & {
    mixId: string;
}

export const Model = (state: State) => state;
