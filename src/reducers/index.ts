import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import { State } from '../types';
import { archive } from './archive';
import { ui } from './ui';
import { music } from './music';

export default combineReducers({
    archive,
    ui,
    music,
    router: routerReducer
}) as Reducer<State>;
