import { Archive } from "../types";
import { Type } from '../actions/archive';

export const initial: Archive = {
    searchResults: [],
    mixes: []
}

export const archive = (state = initial, action: Type) => {
    switch (action.type) {
        case 'ARCHIVE_SEARCH_FETCHING':
            return state;
        case 'ARCHIVE_SEARCH_FETCHED':
            return {
                ...state,
                searchResults: action.results.response.docs
            };
        case 'ARCHIVE_METADATA_FETCHING':
            return state;
        case 'ARCHIVE_METADATA_FETCHED': {
            const id = action.mixInfo.metadata.identifier;
            const mixes = state.mixes.slice();
            const index = mixes.findIndex(m => m.metadata.identifier === id);
            if (index === -1) {
                mixes.push(action.mixInfo);
            } else {
                mixes[index] = action.mixInfo;
            }

            return {
                ...state,
                mixes
            }
        }
        default:
            return state;
    }
}
