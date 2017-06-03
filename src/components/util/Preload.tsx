import * as React from 'react';

type PreloadProps = {
    preload: () => any;
    wait?: boolean;
}

type PreloadState = {
    renderOK: boolean;
}

export class Preload extends React.Component<PreloadProps, PreloadState> {
    state = { renderOK: false };

    async preload() {
        await this.setState({ renderOK: !this.props.wait });
        await this.props.preload();
        await this.setState({ renderOK: true });
    }

    renderPreloaded() {
        return this.state.renderOK
            ? this.props.children
            : [];
    }

    componentDidMount() {
        this.preload();
    }

    render() {
        return <div>{this.renderPreloaded()}</div>;
    }
}

export default Preload;
