import * as React from 'react';
import { lazyLoad } from 'fuse-tools';
import { Component } from 'react-redux';

interface Props {
	bundle: string;
	preload?: () => any;
	wait?: boolean;
}

interface State {
	Component: Component<any>;
	preloaded: boolean;
}

export default class LazyComponent extends React.Component<Props, State> {
	componentWillReceiveProps({ bundle }: Props) {
		if (bundle && !this.state.Component) {
			this.lazyLoad(bundle);
		}
	}

	componentDidMount() {
		this.componentWillReceiveProps(this.props);
	}

	renderLazyComponent() {
		if (this.state.Component) {
			return <this.state.Component />;
		}
	}

	async lazyLoad(name: string) {
		if (!this.state.Component) {
			try {
				const preloaded = this.state.preloaded;
				if (typeof this.props.preload === 'function' && !preloaded) {
					if (this.props.wait) {
						await this.props.preload();
					} else {
						this.props.preload();
					}
					this.setState({ preloaded: true });
				}

				const module = await lazyLoad(name);
				this.setState({
					Component: module.default
				});
			} catch (err) {
				console.log('lazyLoad error:', err);
			}
		}
	}
	render() {
		return this.renderLazyComponent() || <div />;
	}
}
