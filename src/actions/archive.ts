import * as fetchP from 'fetch-jsonp';
import { fetchT } from "../util/fetchTimeout";
import { MixSearchResults, MixInfo, Thunk } from "../types/index";

export type Type
    = { type: 'ARCHIVE_SEARCH_FETCHING' }
    | { type: 'ARCHIVE_SEARCH_FETCHED', results: MixSearchResults }
    | { type: 'ARCHIVE_METADATA_FETCHING' }
    | { type: 'ARCHIVE_METADATA_FETCHED', mixInfo: MixInfo };


// Common
const baseURL = 'https://archive.org';

// Search
const searchPage = 'advancedsearch.php';
const searchTerm = '"Dave+Gradwell"+Mix+Session';
const searchFields = [
    'creator',
    'date',
    'description',
    'downloads',
    'identifier',
    'mediatype',
    'subject',
    'title'
].join('&fl[]=')
const searchURL = `${searchPage}?q=${searchTerm}&fl[]=${searchFields}&output=json`;

export const searchFetching = (): Type => ({
    type: 'ARCHIVE_SEARCH_FETCHING'
});
export const searchFetched = (results: MixSearchResults): Type => ({
    type: 'ARCHIVE_SEARCH_FETCHED',
    results
});

export const searchFetch = (): Thunk => async dispatch => {
    dispatch(searchFetching());

    const url1 = encodeURI(`${baseURL}/${searchURL}`);
    const url2 = './mixes/index.json';

    let response: Response;

    try {
        response = await fetchT(url1, { cache: "force-cache", timeout: 2000 }, fetchP);
    } catch (err) {
        console.log(err);
        console.log(err, 'Using local mix manifest file...');
        response = await fetch(url2, { cache: "force-cache" });
    }

    const results = await response.json() as MixSearchResults;

    dispatch(searchFetched(results));
    return results;
};


// Metadata
const fetchOpts: RequestInit = { mode: 'cors', cache: "force-cache" };

export const metadataFetching = (): Type => ({
    type: 'ARCHIVE_METADATA_FETCHING'
});
export const metadataFetched = (mixInfo: MixInfo): Type => ({
    type: 'ARCHIVE_METADATA_FETCHED',
    mixInfo
});

export const metadataFetch = (id: string): Thunk => async dispatch => {
    dispatch(metadataFetching());

    const url = encodeURI(`${baseURL}/metadata/${id}?output=json`);
    const response = await fetch(url, fetchOpts);

    const mixInfo = await response.json() as MixInfo;

    if (!mixInfo.metadata) {
        throw new Error(`The mix with id '${id}' was not found.`);
    }

    dispatch(metadataFetched(mixInfo));
    return mixInfo;
};
