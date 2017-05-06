import { combineReducers, Reducer } from 'redux';
import { State } from '../types';
import { user } from './user';

export default combineReducers({ user }) as Reducer<State>;
