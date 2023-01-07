import { MusicControl } from "../util/music";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

export interface MixFile {
  name: string;
  source: "derivative" | "original";
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
  creator: string;
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
    docs: MixSearchResult[];
  };
}

export type MixInfo = {
  files: MixFile[];
  metadata: MixMetadata;
  server: string;
  dir: string;
} & {
  [id: string]: CueSheet;
};

export interface Track {
  number: number;
  title: string;
  time: number;
  timeDisplay: string;
}

export interface CueSheet {
  id: string;
  title: string;
  tracks: Track[];
}

export namespace Archive {
  export interface Failure {
    message: string;
    stack?: string;
  }

  export namespace Search {
    export type Response = MixSearchResults;

    export interface Params {
      q: string;
    }
  }

  export namespace Metadata {
    export type Response = MixInfo;
    export interface Params {
      id: string;
    }
  }

  export interface State {
    searchResults: MixSearchResult[];
    mixes: MixInfo[];
    errors: Failure[];
  }
}

export interface UI {
  mixId: string;
  mixListVisible: boolean;
  selectingPos: boolean;
  posSelectTime: number;
  posSelectX: number;
}

export namespace Music {
  export interface State {
    control: () => MusicControl;
    currentTime: number;
    duration: number;
    playing: boolean;
    waiting: boolean;
    seeking: boolean;
    src: string;
  }
}

export interface State {
  music: Music.State;
  archive: Archive.State;
  ui: UI;
}

export type Thunk = ThunkAction<void, State, void, AnyAction>;

export interface ITags extends Record<string, string> {}

export interface IChapter {
  id: number;
  time_base: string;
  start: number;
  start_time: string;
  end: number;
  end_time: string;
  tags: ITags;
}

export interface IMetadata {
  chapters: IChapter[];
  format: {
    filename: string;
    nb_streams: number;
    nb_programs: number;
    format_name: string;
    format_long_name: string;
    duration: string;
    size: string;
    bit_rate: string;
    probe_score: number;
    tags: ITags;
  };
}
