export const _cpp = require('cue-parser-plus');

export interface CueParser {
    parse: (filename: string) => CueSheet;
};

export interface CueSheet {
    title: string;
    files: CDFile[];
};

export interface CDFile {
    tracks: CDTrack[];
};

export interface CDTrack {
    number: number;
    title: string;
    indexes: CDIndex[];
};

export interface CDIndex {
    time: CDTime;
};

export interface CDTime {
    min: number;
    sec: number;
    frame: number;
};

export interface TrackEntry {
    number: number;
    time: number;
    timeDisplay: string;
    title: string;
};

export const zeroPad = (num: number, size: number) => {
    const s = '000000000' + num;
    return s.substr(s.length - size);
};

export const getTotalSeconds = (time: CDTime) => {
    const hrs = (Math.floor((time.min / 60) % 24)) * 3600.0;
    const mins = (time.min % 60) * 60.0;
    const secs = time.sec;
    const msecs = (((time.frame) / 75.0) * 1000.0) / 1000.0;

    return parseFloat(`${hrs + mins + secs + msecs}`);
};

export const formatCDTime = (time: CDTime) => {
    const hrs = Math.floor((time.min / 60) % 24);
    const mins = time.min % 60;
    const secs = time.sec;
    const msecs = (((time.frame) / 75.0) * 1000.0);

    const sHrs = zeroPad(hrs, 2);
    const sMins = zeroPad(mins, 2);
    const sSecs = zeroPad(secs, 2);
    const sMsecs = zeroPad(msecs, 3);

    return `${sHrs}:${sMins}:${sSecs}.${sMsecs}`;
};

export const getTrackEntries = (cuesheet: CueSheet): TrackEntry[] => {
    const [file] = cuesheet.files;

    const hasFilesAndTracks = file && file.tracks.length;

    return hasFilesAndTracks ? file.tracks.map(track => {
        const num = track.number; // zeroPad(track.number, 2);
        const [index] = track.indexes;
        const time = formatCDTime(index.time);
        const totalSeconds = getTotalSeconds(index.time);

        return {
            number: num,
            time: totalSeconds,
            timeDisplay: time,
            title: track.title
        };
    }) : [];
};

export const getArchiveCueSheet = (mixId: string, entries: TrackEntry[], cuesheet: CueSheet) => {
    return {
        id: mixId,
        title: cuesheet.title,
        tracks: entries
    };
};

export const printTrackEntry = (trackEntry: TrackEntry) => {
    const { number, timeDisplay, title } = trackEntry;
    console.log(`${number} [${timeDisplay}] ${title}`);
};

export const main = (argv: string[]): number => {
    const [filename, mixId] = argv;

    const cuesheet: CueSheet = _cpp.parse(filename);
    const entries = getTrackEntries(cuesheet);

    if (mixId) {
        const archive = getArchiveCueSheet(mixId, entries, cuesheet)
        console.log(JSON.stringify(archive, null, 4));
    } else {
        entries.map(printTrackEntry);
    }

    return 0;
};

// Command-line
if (require.main === module) {
    try {
        process.exit(main(process.argv.slice(2)));
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }

}
