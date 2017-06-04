import * as React from 'react';
import { lazyLoad } from 'fuse-tools';
import { Component } from 'react-redux';

interface Props {
	bundle: string;
	preload?: () => any;
	wait?: boolean;
	props?: any;
}

interface State {
	BundleComponent: Component<any>;
	preloaded: boolean;
}

export default class Bundle extends React.Component<Props, State> {
	componentWillReceiveProps({ bundle }: Props) {
		if (bundle && !this.state.BundleComponent) {
			this.lazyLoad(bundle);
		}
	}

	componentDidMount() {
		this.componentWillReceiveProps(this.props);
	}

	async lazyLoad(name: string) {
		if (!this.state.BundleComponent) {
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
					BundleComponent: module.default
				});
			} catch (err) {
				console.log('lazyLoad error:', err);
			}
		}
	}
	render() {
		const { BundleComponent = () => <div /> } = this.state;

		return <BundleComponent />;
	}
}
