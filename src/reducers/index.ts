import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import { State } from '../types';
import { archive } from './archive';
import { ui } from './ui';
import { music } from './music';

export const createReducer = (reducers?: { [idx: string]: Reducer<State> }) => {
    return combineReducers({
        archive,
        ui,
        music,
        router: routerReducer,
        ...reducers
    }) as Reducer<State>;
};
