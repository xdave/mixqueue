import styles from './styles';
import { Sheet } from "react-jss";
import { State } from "../../../../types/index";

export type Props = Sheet<typeof styles> & {
    dummy?: any;
};

export default (state: State) => state;
