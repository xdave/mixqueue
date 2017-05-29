import { styles } from './styles';
import { Sheet } from "react-jss";
import { Track, State } from "../../../../../types/index";

import { WidthProps } from 'material-ui/utils/withWidth';

export type Props = Sheet<typeof styles> & WidthProps & {
    track: Track;
}

export const Model = (state: State, props: Props) => ({
    ...state,
    ...props
});
