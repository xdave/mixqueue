import actionCreatorFactory from 'typescript-fsa';

const create = actionCreatorFactory('ui');

export const mixListToggle = create<{ value?: boolean }>('MIX_LIST_TOGGLE');
export const setSelectingPos = create<{ selectingPos: boolean }>('SET_SELECTING_POS');
export const setPosSelectionTime = create<{ posSelectTime: number }>('SET_POS_SELECTION_TIME');
export const setPosSelectionX = create<{ posSelectX: number }>('SET_POS_SELECTION_X');
