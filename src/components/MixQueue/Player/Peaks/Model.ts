import { Sheet } from "react-jss";
import { State } from "../../../../types/index";
import { styles } from './styles';

export type Props = Sheet<typeof styles> & {
    dummy?: any;
}

export const Model = (state: State) => state;
