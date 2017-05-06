import * as path from 'path';
import { FuseBox, UglifyJSPlugin, WebIndexPlugin } from 'fuse-box';
import { MochaRunner } from './MochaRunner';

const tests = ['-t', '--test'].some(t => process.argv.includes(t));
const dev = ['-d', '--dev'].some(t => process.argv.includes(t));
const watch = ['-w', '--watch'].some(t => process.argv.includes(t)) || dev;

const env = process.env.NODE_ENV;
const prod = env === 'production';
const appRoot = path.resolve('.');
const homeDir = path.join(appRoot, 'src');
const outDir = path.join(appRoot, 'public');
const output = path.join(outDir, '$name.js');
const template = path.join(homeDir, 'index.html');

const apps = [
    {
        name: 'app',
        instructions: '> index.tsx'
    }
];

const mochaGlob = ['src/**/*.{spec,test}.{ts,tsx,js,jsx}'];
const mochaOptions = { reporter: watch ? 'min' : 'spec' };
const mochaBundles = apps.map(app => app.name).filter(app => app === 'vendors');

const fuse = FuseBox.init({
    homeDir,
    output,
    plugins: [
        WebIndexPlugin({ template }),
        tests && new MochaRunner(mochaGlob, mochaOptions, mochaBundles),
        prod && UglifyJSPlugin()
    ]
});

apps
    .map(app => fuse.bundle(app.name)
        .cache(!prod)
        .log(!(watch && tests))
        .sourceMaps(true)
        .instructions(app.instructions))
    .map(bundle => watch ? bundle.watch() : bundle)
    .map(bundle => dev ? bundle.hmr() : bundle);

if (dev) {
    fuse.dev();
}

fuse.run();
