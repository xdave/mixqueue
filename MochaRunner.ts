import { WorkFlowContext } from 'fuse-box/dist/typings/core/WorkflowContext';

import * as path from 'path';
import * as glob from 'glob';
import * as Mocha from 'mocha';

export class MochaRunner {
    static defaultOptions = {};
    mocha: Mocha;
    patterns: string[];
    mochaOptions: MochaSetupOptions;
    onlyForBundles?: string[];

    constructor(
        patterns: string[],
        options = MochaRunner.defaultOptions,
        onlyForBundles?: string[]
    ) {
        this.patterns = patterns;
        this.mochaOptions = {
            ...MochaRunner.defaultOptions,
            ...options
        };
        this.onlyForBundles = onlyForBundles;
    }

    postBundle(ctx: WorkFlowContext) {
        if (this.onlyForBundles && this.onlyForBundles.length > 0) {
            if (this.onlyForBundles.some(name => ctx.bundle.name !== name)) {
                return;
            }
        }
        ctx.log.echo('Running Mocha tests...');
        this.mocha = new Mocha(this.mochaOptions);

        Object.keys(require.cache).forEach(f => delete require.cache[f]);

        this.patterns
            .map(pattern => glob.sync(pattern))
            .reduce((prev, cur) => cur.concat(prev), [])
            .filter((file, index, list) => list.indexOf(file) === index)
            .forEach(f => this.mocha.addFile(f));

        try {
            this.mocha.run(failures => {
                if (failures) {
                    ctx.log.echoWarning(`${failures} test failure(s)`);
                }
            });
        } catch (err) {
            console.log(err.message);
        } finally {
            if (this.mocha) {
                delete this.mocha;
            }
        }
    }
}

export default MochaRunner;
