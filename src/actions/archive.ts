import actionCreatorFactory from 'typescript-fsa';
import { bindThunkAction } from 'typescript-fsa-redux-thunk';
import * as fetchP from 'fetch-jsonp';
import { fetchT } from "../util/fetchTimeout";
import { Archive } from "../types";
import { parse } from "../util/cueSheet";

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
    `${searchPage}?q=${q}&fl[]=${searchFields}&rows=100&output=json`;

const create = actionCreatorFactory('archive');

export const searchAsync = create.async<
    Archive.Search.Params,
    Archive.Search.Response,
    Error
    >('SEARCH');

export const search = bindThunkAction(searchAsync, async params => {
    const url1 = encodeURI(`${baseURL}/${searchURL(params.q)}`);
    const url2 = './mixes/index.json';

    let response: Response;

    try {
        response = await fetchT(url1, { cache: "force-cache", timeout: 2000 }, fetchP as any);
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

export const fetchMetadata = bindThunkAction(fetchMetadataAsync, async ({ id }) => {
    const url = encodeURI(`${baseURL}/metadata/${id}?output=json`);
    const response = await fetch(url, fetchOpts);

    if (response.status >= 400) {
        throw new Error(`${response.status} ${response.statusText}`);
    }

    const mixInfo = await response.json() as Archive.Metadata.Response;

    if (!mixInfo[mixInfo.metadata.identifier]) {
        const [cue] = mixInfo.files.filter(f => f.name.indexOf('.cue') > - 1);
        // const server = mixInfo.server.replace('us.archive', 's3dns.us.archive');
        // const cueUrl = `https://${server}/${mixInfo.metadata.identifier}/${cue.name}`;
        const cueUrl = `https://cors-anywhere.herokuapp.com/https://${mixInfo.server}${mixInfo.dir}/${cue.name}`;
        const cueRes = await fetch(cueUrl);
        const cueTxt = await cueRes.text();

        mixInfo[mixInfo.metadata.identifier] = {
            id: mixInfo.metadata.identifier,
            title: mixInfo.metadata.title,
            tracks: parse(cueTxt).tracks.map(track => ({
                number: track.number,
                title: `${track.artist} - ${track.title} [${track.label}]`,
                time: track.time,
                timeDisplay: ''
            }))
        };
    }

    if (!mixInfo.metadata) {
        throw new Error(`The mix with id '${id}' was not found.`);
    }

    return mixInfo;
});
