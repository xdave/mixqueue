import * as musicActions from '../../../../actions/music';
import * as uiActions from '../../../../actions/ui';

export const Controller = {
    setTime: musicActions.setTime,
    setSelectingPos: uiActions.setSelectingPos,
    setPosSelectionX: uiActions.setPosSelectionX,
    setPosSelectionTime: uiActions.setPosSelectionTime
};
