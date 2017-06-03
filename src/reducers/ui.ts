import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/ui';
import { UI } from "../types";

export const initial: UI = {
    mixId: '',
    mixListVisible: false,
    selectingPos: false,
    posSelectTime: 0,
    posSelectX: 0
};

export const ui = reducerWithInitialState(initial)
    .case(actions.mixListToggle, (state, { value }) => ({
        ...state,
        mixListVisible: value
    }))
    .case(actions.setSelectingPos, (state, { selectingPos }) => ({
        ...state,
        selectingPos
    }))
    .case(actions.setPosSelectionTime, (state, { posSelectTime }) => ({
        ...state,
        posSelectTime
    }))
    .case(actions.setPosSelectionX, (state, { posSelectX }) => ({
        ...state,
        posSelectX
    }))
    .build();
