import { MixFile } from "../types/index";

export const getAudioSources = (files: MixFile[], mixId: string) =>
    files
        .filter(f => [/ogg/i, /mp3/i].some(r => r.test(f.format)))
        .slice()
        .sort(a => (/ogg/i).test(a.format) ? -1 : 1)
        .map(f => `https://archive.org/download/${mixId}/${f.name}`);

export const getPeaksImage = (files: MixFile[], mixId: string) =>
    files
        .filter(f => /png/i.test(f.format))
        .map(f => `https://archive.org/download/${mixId}/${f.name}`)[0];
