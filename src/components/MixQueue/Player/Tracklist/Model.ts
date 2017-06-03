import styles from './styles';
import { Sheet } from "react-jss";
import { State } from "../../../../types/index";

export type Props = Sheet<typeof styles> & {
    mixId: string;
};

export const Model = (state: State) => state;
