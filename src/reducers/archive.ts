import { reducerWithInitialState } from "typescript-fsa-reducers";
import * as actions from "../actions/archive";
import { Archive } from "../types";

export const initial: Archive.State = {
  searchResults: [],
  mixes: [],
  errors: [],
};

export const archive = reducerWithInitialState(initial)
  .case(actions.search.async.started, (state) => state)
  .case(actions.search.async.done, (state, { result }) => ({
    ...state,
    searchResults: result.response.docs,
  }))
  .case(actions.search.async.failed, (state, { error }) => ({
    ...state,
    errors: [...state.errors, error],
  }))
  .case(actions.fetchMetadata.async.started, (state) => state)
  .case(actions.fetchMetadata.async.done, (state, { result }) => {
    const id = result.metadata.identifier;
    const mixes = state.mixes.slice();
    const index = mixes.findIndex((m) => m.metadata.identifier === id);
    if (index === -1) {
      mixes.push(result);
    } else {
      mixes[index] = result;
    }
    return {
      ...state,
      mixes,
    };
  })
  .case(actions.fetchMetadata.async.failed, (state, { error }) => ({
    ...state,
    errors: [...state.errors, error],
  }));
