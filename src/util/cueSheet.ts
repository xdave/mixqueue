import defaultExport from "cue-parser-plus";

const cueParser: Cue.Parser = defaultExport as any;

export namespace Cue {
  export interface Parser {
    parse: (filename: string) => Sheet;
    parseText: (text: string) => Sheet;
  }

  export interface Comments {
    [index: string]: string;
  }

  export interface Sheet {
    performer: string;
    title: string;
    files: File[];
    rems: Comments;
  }

  export interface File {
    name: string;
    type: string;
    tracks: Track[];
    rems: Comments;
  }

  export interface Track {
    number: number;
    type: string;
    flags: string[];
    performer: string;
    title: string;
    indexes: Index[];
    rems: Comments;
  }

  export interface Index {
    number: number;
    time: Time;
  }

  export interface Time {
    min: number;
    sec: number;
    frame: number;
  }

  export interface ParseResult {
    date: string;
    filename: string;
    artist: string;
    title: string;
    tracks: {
      number: number;
      time: number;
      artist: string;
      title: string;
      label: string;
    }[];
  }
}

export const getTotalSeconds = (time: Cue.Time) => {
  const hrs = Math.floor((time.min / 60) % 24) * 3600.0;
  const mins = (time.min % 60) * 60.0;
  const secs = time.sec;
  const msecs = ((time.frame / 75.0) * 1000.0) / 1000.0;

  return parseFloat(`${hrs + mins + secs + msecs}`);
};

export const parseOldStyle = (sheet: Cue.Sheet): Cue.ParseResult => {
  const mixRegex = /([^\-]+) - ([^\(]+) \((.+)\)/;
  const matches = mixRegex.exec(sheet.title);
  const [, performer, mixTitle, date] = [].slice.call(matches || []);

  return sheet.files.map((file) => ({
    date,
    filename: file.name,
    artist: performer,
    title: mixTitle,
    tracks: file.tracks.map((track) => {
      const r = /([^\-]+) - ([^\[]+) \[(.+)\]/;
      const matches = r.exec(track.title);
      const [, artist, title, label] = [].slice.call(matches || []);
      return {
        number: track.number,
        time: getTotalSeconds(track.indexes[0].time),
        artist,
        title,
        label,
      };
    }),
  }))[0];
};

export const parse = (text: string): Cue.ParseResult => {
  const sheet = cueParser.parseText(text);

  if (!sheet.performer) {
    return parseOldStyle(sheet);
  }

  return sheet.files.map((file) => ({
    date: sheet.rems.DATE,
    filename: file.name,
    artist: sheet.performer,
    title: sheet.title,
    tracks: file.tracks.map((track) => ({
      number: track.number,
      time: getTotalSeconds(track.indexes[0].time),
      artist: track.performer,
      title: track.title.replace(` [${track.rems.LABEL}]`, ""),
      label: track.rems.LABEL,
    })),
  }))[0];
};
