import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import { State } from '../types';
import { archive } from './archive';
import { audio } from './audio';
import { ui } from './ui';

export default combineReducers({
    archive,
    audio,
    ui,
    router: routerReducer
}) as Reducer<State>;
