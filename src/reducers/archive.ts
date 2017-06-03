import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/archive';
import { Archive } from "../types";

export const initial: Archive.State = {
    searchResults: [],
    mixes: [],
    errors: []
}

export const archive = reducerWithInitialState(initial)
    .case(actions.searchAsync.started, state => state)
    .case(actions.searchAsync.done, (state, { result }) => ({
        ...state,
        searchResults: result.response.docs
    }))
    .case(actions.searchAsync.failed, (state, { error }) => ({
        ...state,
        errors: [...state.errors, error]
    }))
    .case(actions.fetchMetadataAsync.started, state => state)
    .case(actions.fetchMetadataAsync.done, (state, { result }) => {
        const id = result.metadata.identifier;
        const mixes = state.mixes.slice();
        const index = mixes.findIndex(m => m.metadata.identifier === id);
        if (index === -1) {
            mixes.push(result);
        } else {
            mixes[index] = result;
        }
        return {
            ...state,
            mixes
        };
    })
    .case(actions.fetchMetadataAsync.failed, (state, { error }) => ({
        ...state,
        errors: [...state.errors, error]
    }));
