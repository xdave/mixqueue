import { Action, Store, Reducer } from 'redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { State } from '../types';
import { MusicControl } from "../util/music";
import { Middleware } from "redux";

const prod = process.env.NODE_ENV === 'production';

declare const window: {
    __REDUX_STORE__: Store<State>;
    __MUSIC__: MusicControl;
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

const getDevMiddleware = (): Middleware[] => prod
    ? []
    : [
        r('redux-immutable-state-invariant').default(),
        r('redux-logger').createLogger({
            level: 'info',
            collapsed: true,
            diff: true,
            predicate: (_: State, action: Action) => (
                [
                    /TIME_UPDATE/,
                    /SELECTION/,
                    /SELECTING/
                ].every(t => !t.test(action.type))
            )
        }),
    ];

export const configureStore = (reducer: Reducer<State>) => {
    const existingStore = window.__REDUX_STORE__;
    const music = window.__MUSIC__;

    const middleware = [
        ...getCommonMiddleware(),
        ...getDevMiddleware(),
    ];

    const store = existingStore
        ? (existingStore.replaceReducer(reducer), existingStore)
        : window.__REDUX_STORE__ = createStore(
            reducer,
            composeEnhancers(applyMiddleware(...middleware))
        );

    music ? music : window.__MUSIC__ = new MusicControl(store);

    return store as Store<State>;
};
