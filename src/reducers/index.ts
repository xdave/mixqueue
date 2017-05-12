import { combineReducers, Reducer } from 'redux';
import { State } from '../types';
import { audio } from './audio';

export default combineReducers({
    audio
}) as Reducer<State>;
