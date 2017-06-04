import * as path from 'path';
import * as React from 'react';
import { configureStore, injectAsyncReducer } from '../../store';

declare const FuseBox: any;

type Props = {
    bundleDir?: string;
    moduleDir?: string;
    props?: any;
    name: string
};

type State = {
    bundleDir: string;
    moduleDir: string;
    View: () => JSX.Element;
}

export class Module extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const bundleDir = path.join(...(props.bundleDir
            ? props.bundleDir
            : window.location.pathname)
            .split('/'));


        this.setState({
            bundleDir: bundleDir,
            moduleDir: props.moduleDir || 'modules'
        });
    }

    loading = () => {
        this.setState({
            View: () => <div>Loading...</div>
        });
    }

    loadModule() {
        const { bundleDir, moduleDir } = this.state;
        const { name } = this.props;

        this.loading();

        if (!FuseBox.plugins.find((p: any) => p.name === name)) {
            FuseBox.addPlugin({
                name,
                hmrUpdate: ({ path }: any) => {
                    const r = new RegExp(`${moduleDir}\/([^\/]+)`);
                    const matches = r.exec(path);
                    if (matches && matches[1] === name) {
                        this.reloadModule();
                        return true;
                    }
                }
            });
        }

        FuseBox.import(`${bundleDir}/${name}.js`, () => {
            const module = require(`~/${moduleDir}/${name}`);
            const { View, reducer, reducerKey } = module.default;
            if (reducer) {
                injectAsyncReducer(configureStore(), reducerKey, reducer);
            }
            if (View) {
                this.setState({ View });
            }
            if (!View && !reducer) {
                console.log(`Cannot load module "${name}".`)
            }
        });
    }

    unloadModule() {
        const { bundleDir } = this.state;
        const { name } = this.props;
        FuseBox.remove(`${bundleDir}/${name}.js`);
    }

    reloadModule() {
        this.unloadModule();
        this.loadModule();
    }

    componentDidMount() {
        this.loadModule();
    }

    componentWillUnmount() {
        this.unloadModule();
    }

    render() {
        return <this.state.View {...this.props.props} />;
    }
}
