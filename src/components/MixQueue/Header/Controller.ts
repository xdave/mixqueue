import { bindActionCreators, Dispatch } from "redux";
import * as archiveActions from '../../../actions/archive';
import * as audioActions from '../../../actions/audio';
import * as uiActions from '../../../actions/ui';

export type Actions = typeof archiveActions & typeof audioActions & typeof uiActions;
export const Controller = (dispatch: Dispatch<Actions>) => ({
    ...bindActionCreators({ ...archiveActions }, dispatch),
    ...bindActionCreators({ ...audioActions }, dispatch),
    ...bindActionCreators({ ...uiActions }, dispatch)
});
