import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import fetchP from "fetch-jsonp";
import { fetchT } from "../util/fetchTimeout";
import { Archive, IMetadata, State } from "../types";

const fetchOpts: RequestInit = { mode: "cors", cache: "force-cache" };
const baseURL = "https://archive.org";
const searchPage = "advancedsearch.php";
const searchFields = [
  "creator",
  "date",
  "description",
  "downloads",
  "identifier",
  "mediatype",
  "subject",
  "title",
].join("&fl[]=");

const searchURL = (q: string) =>
  `${searchPage}?q=${q}&fl[]=${searchFields}&rows=100&output=json`;

const create = actionCreatorFactory("archive");

/** The typescript-fsa-redux-thunk async action creator factory function */
const createAsync = asyncFactory<State>(create);

export const search = createAsync<
  Archive.Search.Params,
  Archive.Search.Response,
  Error
>("SEARCH", async (params) => {
  const url1 = encodeURI(`${baseURL}/${searchURL(params.q)}`);
  const url2 = "./mixes/index.json";

  let response: Response;

  try {
    response = await fetchT(
      url1,
      { cache: "force-cache", timeout: 5000 },
      fetchP as any
    );
    if (response.status >= 400) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (err) {
    console.warn(err);
    console.warn("Using local mix manifest file...");
    response = await fetch(url2, { cache: "force-cache" });
    if (response.status >= 400) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  }

  const results = await response.json();
  return results as Archive.Search.Response;
});

export const fetchMetadata = createAsync<
  Archive.Metadata.Params,
  Archive.Metadata.Response,
  Error
>("FETCH_METADATA", async ({ id }) => {
  const url = encodeURI(`${baseURL}/metadata/${id}?output=json`);
  const response = await fetch(url, fetchOpts);

  if (response.status >= 400) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const mixInfo = (await response.json()) as Archive.Metadata.Response;

  if (mixInfo && mixInfo.files && !mixInfo[mixInfo?.metadata?.identifier]) {
    const [file] = mixInfo.files.filter((f) => f.name.indexOf(".json") > -1);
    const metadataUrl = `https://archive.org/download/${mixInfo.metadata.identifier}/${file.name}`;
    const metaRes = await fetch(metadataUrl);
    const metadata: IMetadata = await metaRes.json();

    mixInfo[mixInfo.metadata.identifier] = {
      id: mixInfo.metadata.identifier,
      title: mixInfo.metadata.title,
      tracks: metadata.chapters.map((chapter) => ({
        number: chapter.id + 1,
        title: chapter.tags.title || chapter.tags.TITLE,
        time: parseFloat(chapter.start_time),
        timeDisplay: "",
      })),
    };
  }

  if (!mixInfo.metadata) {
    throw new Error(`The mix with id '${id}' was not found.`);
  }

  return mixInfo;
});
