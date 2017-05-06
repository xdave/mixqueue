import { createStore, Store, Reducer } from 'redux';
import { State } from '../types';

interface ReduxWindow extends Window {
    __REDUX_STORE__: Store<State>;
}

declare const window: ReduxWindow;

export const configureStore = (reducer: Reducer<State>) => {
    const store = window.__REDUX_STORE__;

    return store
        ? (store.replaceReducer(reducer), store)
        : window.__REDUX_STORE__ = createStore(reducer);
};
