import { compose, Action, Store, Reducer } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { State } from '../types';

const prod = process.env.NODE_ENV === 'production';

declare const window: {
    __REDUX_STORE__: Store<State>;
} & Window;

export const history = createHistory();

const r = require;

const composeEnhancers: typeof compose = !prod
    ? r('redux-devtools-extension').composeWithDevTools({})
    : compose;

const getCommonMiddleware = () => [
    thunk,
    routerMiddleware(history)
];

const getDevMiddleware = () => prod
    ? []
    : [
        r('redux-immutable-state-invariant').default(),
        r('redux-logger').createLogger({
            level: 'info',
            collapsed: true,
            diff: true,
            predicate: (_: State, action: Action) => !([
                'AUDIO_SET_CURRENT_TIME_DONE',
                'UI_SET_SELECTING_POS',
                'UI_SET_POSITION_SELECTION_TIME',
                'UI_SET_POSITION_SELECTION_X'
            ].some(t => action.type === t))
        }),
    ];

export const configureStore = (reducer: Reducer<State>) => {
    const store = window.__REDUX_STORE__;

    const middleware = [
        ...getCommonMiddleware(),
        ...getDevMiddleware(),
    ];

    return store
        ? (store.replaceReducer(reducer), store)
        : window.__REDUX_STORE__ = createStore(
            reducer,
            undefined, // TODO: FIXME: Load state from localStorage/cookie?
            composeEnhancers(applyMiddleware(...middleware))
        );
};
