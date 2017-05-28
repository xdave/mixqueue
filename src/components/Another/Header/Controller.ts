import { bindActionCreators, Dispatch } from "redux";
import * as archiveActions from '../../../actions/archive';
import * as audioActions from '../../../actions/audio';
import * as uiActions from '../../../actions/ui';

export type Actions = uiActions.Type;
export const Controller = (dispatch: Dispatch<Actions>) => ({
    actions: {
        archive: bindActionCreators({ ...archiveActions }, dispatch),
        audio: bindActionCreators({ ...audioActions }, dispatch),
        ui: bindActionCreators({ ...uiActions }, dispatch)
    }
});
