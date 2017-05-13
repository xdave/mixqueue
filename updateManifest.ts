import * as path from 'path';
import * as fs from 'fs';
import fetch from 'node-fetch';
import * as queryString from 'query-string';

const writeOptions = { encoding: 'utf-8' };

const writeFile = (filename: string, data: any, options = writeOptions) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, options, err => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};

const defaultQ = '"Dave Gradwell" Mix';
const defaultFields = [
    'identifier',
    'title',
    'date'
];

const fetchManifest = async (q = defaultQ, fl = defaultFields) => {
    const scheme = 'https';
    const host = 'archive.org';
    const endpoint = 'advancedsearch.php';
    const query = queryString.stringify(
        { q, fl, output: 'json' }, { arrayFormat: 'bracket' });
    const url = `${scheme}://${host}/${endpoint}?${query}`;
    const response = await fetch(url);
    return await response.json();
};

if (typeof require !== 'undefined' && (require as any).main === module) {
    (async () => {
        try {
            const name = path.join(path.resolve('docs'), 'mixes', 'index.json');
            const json = await fetchManifest();
            const data = JSON.stringify(json, null, 4);
            await writeFile(name, data);
            console.log('Wrote', name);
        } catch (err) {
            console.log('Error', err);
        }
    })();
}
