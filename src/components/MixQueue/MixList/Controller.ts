import { bindActionCreators, Dispatch } from "redux";
import * as archiveActions from '../../../actions/archive';

export type Actions = typeof archiveActions;
export const Controller = (dispatch: Dispatch<Actions>) => ({
    ...bindActionCreators({ ...archiveActions }, dispatch)
});
