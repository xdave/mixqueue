import { AudioControl } from "../util/audio";
import { RouterState } from "react-router-redux";
import { ThunkAction } from "redux-thunk";

export interface MixFile {
    name: string;
    source: 'derivative' | 'original',
    format: string;
    size: string;
    sha1: string;
    length?: string;
    width?: string;
    height?: string;
}

export interface MixMetadata {
    addeddate: string;
    collection: string;
    creator: string
    curation: string;
    date: string;
    description: string;
    identifier: string;
    language: string;
    licenseurl: string;
    mediatype: string;
    publicdate: string;
    scanner: string;
    subject: string;
    title: string;
    uploader: string;
    year: string;
}

export interface MixSearchResult {
    creator: string;
    date: string;
    description: string;
    downloads: number;
    identifier: string;
    mediatype: string;
    subject: string;
    title: string;
}

export interface MixSearchResults {
    response: {
        docs: MixSearchResult[]
    }
}

export type MixInfo = {
    files: MixFile[];
    metadata: MixMetadata;
    server: string;
    dir: string;
} & {
    [id: string]: CueSheet;
}

export interface Track {
    number: number;
    title: string;
    time: number;
    timeDisplay: string;
}

export interface CueSheet {
    id: string;
    title: string;
    tracks: Track[]
}

// export interface Mix {
//     id: string;
//     title: string;
//     date: string;
//     files: MixFile[];
//     cueSheet: CueSheet;
//     sources: string[];
// }

export interface Audio {
    control?: () => AudioControl;
    currentTime: number;
    playing: boolean;
    duration: number;
    seeking: boolean;
    waiting: boolean;
}

export interface Archive {
    searchResults: MixSearchResult[];
    mixes: MixInfo[];
}

export interface UI {
    mixId: string;
    mixListVisible: boolean;
    selectingPos: boolean;
    posSelectTime: number;
    posSelectX: number;
}

export interface State {
    audio: Audio;
    archive: Archive;
    router: RouterState;
    ui: UI;
}

export type Thunk = ThunkAction<void, State, void>;
