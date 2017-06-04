import actionCreatorFactory from 'typescript-fsa';
import thunk from '../util/async';
import * as fetchP from 'fetch-jsonp';
import { fetchT } from "../util/fetchTimeout";
import { Archive } from "../types";

const fetchOpts: RequestInit = { mode: 'cors', cache: "force-cache" };
const baseURL = 'https://archive.org';
const searchPage = 'advancedsearch.php';
const searchFields = [
    'creator',
    'date',
    'description',
    'downloads',
    'identifier',
    'mediatype',
    'subject',
    'title'
].join('&fl[]=');

const searchURL = (q: string) =>
    `${searchPage}?q=${q}&fl[]=${searchFields}&output=json`;

const create = actionCreatorFactory('archive');

export const searchAsync = create.async<
    Archive.Search.Params,
    Archive.Search.Response,
    Error
    >('SEARCH');

export const search = thunk(searchAsync, async params => {
    const url1 = encodeURI(`${baseURL}/${searchURL(params.q)}`);
    const url2 = './mixes/index.json';

    let response: Response;

    try {
        response = await fetchT(url1, { cache: "force-cache", timeout: 2000 }, fetchP);
        if (response.status >= 400) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.warn(err);
        console.warn('Using local mix manifest file...');
        response = await fetch(url2, { cache: "force-cache" });
        if (response.status >= 400) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    }

    const results = await response.json();
    return results as Archive.Search.Response;
});

export const fetchMetadataAsync = create.async<
    Archive.Metadata.Params,
    Archive.Metadata.Response,
    Error
    >('FETCH_METADATA');

export const fetchMetadata = thunk(fetchMetadataAsync, async ({ id }) => {
    const url = encodeURI(`${baseURL}/metadata/${id}?output=json`);
    const response = await fetch(url, fetchOpts);

    if (response.status >= 400) {
        throw new Error(`${response.status} ${response.statusText}`);
    }

    const mixInfo = await response.json() as Archive.Metadata.Response;

    if (!mixInfo.metadata) {
        throw new Error(`The mix with id '${id}' was not found.`);
    }

    return mixInfo;
});
