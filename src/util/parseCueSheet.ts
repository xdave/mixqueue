import { CueSheet } from '../types';

export const parseCueSheet = (sheet: string) => {
    const result: CueSheet = {
        id: '',
        title: '',
        tracks: []
    };
    const lines = sheet.trim().split('\n');
    for (const line of lines) {
        if (line.startsWith('REM')) {
            continue;
        }
        if (line.startsWith('TITLE ')) {
            result.title = line.
                trim()
                .replace('TITLE ', '')
                .replace(/"/g, '');
            continue;
        }
        if (line.startsWith('  TRACK ')) {
            const num = parseInt(line
                .replace('  TRACK ', '')
                .substr(0, 3).trim(), 10);
            const track = {
                number: num,
                title: '',
                time: 0,
                timeDisplay: ''
            };
            result.tracks.push(track);
            continue;
        }
        if (line.startsWith('    TITLE ')) {
            const title = line
                .replace('    TITLE ', '')
                .replace(/"/g, '')
                .trim();
            const lastTrack = result.tracks[result.tracks.length - 1];
            lastTrack.title = title;
        }
        if (line.startsWith('    INDEX 01 ')) {
            const t = line
                .replace('    INDEX 01 ', '')
                .trim();
            const [m, s, f] = t.split(':').map(item => parseInt(item, 10));
            const seconds = (m * 60) + s + (f * (1000 / 75.0) / 1000);
            const lastTrack = result.tracks[result.tracks.length - 1];
            lastTrack.time = seconds;
            lastTrack.timeDisplay = t;
            continue;
        }
    }
    return result;
};
