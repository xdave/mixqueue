import { RouteComponentProps } from "react-router-dom";
import { Sheet } from "react-jss";
import { State } from "../../../types/index";
import { styles } from "./styles";

export type RouteProps = RouteComponentProps<{ mixId: string }>;

export type Props = Sheet<typeof styles> & RouteProps;

export const Model = (state: State) => state;
