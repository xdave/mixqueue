export type Type
    = { type: 'UI_MIX_LIST_TOGGLE', value?: boolean }
    | { type: 'UI_SET_SELECTING_POS', selectingPos: boolean }
    | { type: 'UI_SET_POSITION_SELECTION_X', posSelectX: number }
    | { type: '@@router/LOCATION_CHANGE', payload: Location };

export const mixListToggle = (value?: boolean): Type => ({
    type: 'UI_MIX_LIST_TOGGLE',
    value
});

export const setSelectingPos = (selectingPos: boolean): Type => ({
    type: 'UI_SET_SELECTING_POS',
    selectingPos
});

export const setPosSelectionX = (posSelectX: number): Type => ({
    type: 'UI_SET_POSITION_SELECTION_X',
    posSelectX
});
