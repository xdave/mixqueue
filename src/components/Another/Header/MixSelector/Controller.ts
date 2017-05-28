import { Dispatch } from "redux";
import { bindActionCreators } from "redux";
import * as archiveActions from '../../../../actions/archive';
import * as uiActions from '../../../../actions/ui';

export type Actions = typeof archiveActions & typeof uiActions;
export const Controller = (dispatch: Dispatch<Actions>) => ({
    actions: {
        archive: bindActionCreators({ ...archiveActions }, dispatch),
        ui: bindActionCreators({ ...uiActions }, dispatch)
    }
});
