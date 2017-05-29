import { bindActionCreators, Dispatch } from "redux";
import * as audioActions from '../../../../actions/audio';

export type Actions = typeof audioActions;

export const Controller = (dispatch: Dispatch<Actions>) => ({
    ...bindActionCreators({ ...audioActions }, dispatch)
});
