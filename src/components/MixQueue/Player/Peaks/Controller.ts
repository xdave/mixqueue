import { Dispatch } from "redux";
import { bindActionCreators } from "redux";
import * as audioActions from '../../../../actions/audio';
import * as uiActions from '../../../../actions/ui';

export type Actions = typeof audioActions & typeof uiActions;
export const Controller = (dispatch: Dispatch<Actions>) => ({
    ...bindActionCreators({ ...audioActions }, dispatch),
    ...bindActionCreators({ ...uiActions }, dispatch),
});
