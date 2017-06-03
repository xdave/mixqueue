import { Sheet } from "react-jss";
import { State } from "../../../types/index";
import { Stylesheet } from './Stylesheet';

export type Props = Sheet<typeof Stylesheet> & {
    mixId: string;
};

export const Model = (state: State) => state;
