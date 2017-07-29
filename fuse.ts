import * as path from 'path';
import {
    FuseBox,
    EnvPlugin,
    JSONPlugin,
    SVGPlugin,
    UglifyJSPlugin,
    // QuantumPlugin,
    WebIndexPlugin
} from 'fuse-box';
import { MochaRunner } from './MochaRunner';

const tests = ['-t', '--test'].some(arg => process.argv.includes(arg));
const dev = ['-d', '--dev'].some(arg => process.argv.includes(arg));
const watch = ['-w', '--watch'].some(arg => process.argv.includes(arg)) || dev;
const hmr = ['-h', '--hmr'].some(arg => process.argv.includes(arg))

const env = process.env.NODE_ENV;
const prod = env === 'production';
const appRoot = path.resolve('.');
const homeDir = path.join(appRoot, 'src');
const outDir = path.join(appRoot, 'docs');
const output = path.join(outDir, '$name.js');
const template = path.join(homeDir, 'index.html');

const apps = [
    {
        name: 'app',
        instructions: `
            > index.tsx
            ${!prod ? `
                + redux-logger
                + redux-immutable-state-invariant
                + redux-devtools-extension
            ` : ''}
        `
    }
];

const mochaGlob = ['src/**/*.{spec,test}.{t,j}s{,x}'];
const mochaOptions = { reporter: watch ? 'min' : 'spec' };
const mochaBundles = apps.map(app => app.name).filter(app => app === 'vendors');

const fuse = FuseBox.init({
    homeDir,
    output,
    log: !(watch && tests),
    cache: !prod,
    sourceMaps: { project: !prod, vendors: !prod },
    alias: {
        'react': 'preact-compat',
        'react-dom': 'preact-compat',
        'create-react-class': 'preact-compat/lib/create-react-class',
        'react-tap-event-plugin': 'preact-tap-event-plugin'
    },
    plugins: [
        EnvPlugin({ NODE_ENV: process.env.NODE_ENV }),
        WebIndexPlugin({
            template,
            title: 'MixQueue',
            path: prod ? '/mixqueue' : undefined
        }),
        JSONPlugin(),
        SVGPlugin(),
        tests && new MochaRunner(mochaGlob, mochaOptions, mochaBundles) as any,
        // prod && QuantumPlugin({
            // removeExportsInterop: false,
            // bakeApiIntoBundle: 'app'
            // uglify: true
        // }),
        prod && UglifyJSPlugin({
            mangle: {
                toplevel: true,
                ie8: false
            }
        })
    ]
});

apps
    .map(app => fuse.bundle(app.name)
        .target('browser')
        .cache(!prod)
        .log(!(watch && tests))
        .instructions(app.instructions))
    .map(bundle => watch ? bundle.watch() : bundle)
    .map(bundle => (dev && hmr) ? bundle.hmr() : bundle);

if (dev) {
    fuse.dev();
}

fuse.run();
