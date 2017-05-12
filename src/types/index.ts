import { AudioControl } from "../util/audio";

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

export interface MixSearchResults {
    response: {
        docs: {
            identifier: string;
            title: string;
            date: string;
        }[]
    }
}

export type MixInfo = {
    files: MixFile[];
    metadata: MixMetadata
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

export interface Mix {
    id: string;
    title: string;
    date: string;
    files: MixFile[];
    cueSheet: CueSheet;
    sources: string[];
}

export interface Audio {
    control?: AudioControl;
    elementId: string;
    mixes: Mix[];
    activeMixes: Mix[];
    activeTracks: Track[];
    currentTime: number;
    playing: boolean;
    duration: number;
    seeking: boolean;
}

export interface State {
    audio: Audio;
}
