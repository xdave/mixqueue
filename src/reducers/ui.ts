import { UI } from "../types";
import { Type } from '../actions/ui';

export const initial: UI = {
    mixId: '',
    mixListVisible: false,
    selectingPos: false,
    posSelectX: 0
};

export const ui = (state = initial, action: Type) => {
    switch (action.type) {
        case 'UI_MIX_LIST_TOGGLE':
            return {
                ...state,
                mixListVisible: typeof action.value !== 'undefined'
                    ? action.value
                    : !state.mixListVisible
            };
        case 'UI_SET_SELECTING_POS':
            return {
                ...state,
                selectingPos: action.selectingPos
            };
        case 'UI_SET_POSITION_SELECTION_X':
            return {
                ...state,
                posSelectX: action.posSelectX,
            };
        case '@@router/LOCATION_CHANGE': {
            const str = action.payload.pathname.split('/').pop() || '';
            const mixId = /Mix/.test(str) ? str : '';
            return {
                ...state,
                mixId
            }
        }
        default:
            return state;
    }
}
