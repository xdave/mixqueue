import { State } from "../../types/index";
import { Sheet } from "react-jss";
import { styles } from "./styles";
import { WidthProps } from "material-ui/utils/withWidth";

export type Props = Sheet<typeof styles> & WidthProps & {
    msg: string;
}

export const Model = (state: State) => state;
