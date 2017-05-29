import { Dispatch } from "redux";
import { bindActionCreators } from "redux";
import * as archiveActions from '../../../../actions/archive';
import * as uiActions from '../../../../actions/ui';

export type Actions = typeof archiveActions & typeof uiActions;
export const Controller = (dispatch: Dispatch<Actions>) => ({
    ...bindActionCreators({ ...archiveActions }, dispatch),
    ...bindActionCreators({ ...uiActions }, dispatch)
});
