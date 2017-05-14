import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import { State } from '../types';
import { audio } from './audio';

export default combineReducers({
    audio,
    router: routerReducer
}) as Reducer<State>;
