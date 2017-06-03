import * as React from 'react';
import { findDOMNode } from 'react-dom';

export interface Props {
	id?: string;
	className?: string;
	style?: any;
	itemSelector: string;
	setHeight?: Function;
}

export default class ScrollToItem extends React.Component<Props, {}> {

	doResize = () => {
		if (this.props.setHeight) {
			const el = findDOMNode(this) as HTMLElement;
			el.style.height = this.props.setHeight();
		}
	}

	resize = () => {
		this.doResize();
		this.forceUpdate();
	}

	scroll = () => {
		const selector = `.${this.props.itemSelector}`;
		const el = findDOMNode(this) as HTMLDivElement;
		const item = el.querySelector(selector) as HTMLElement;
		if (item) {
			item.scrollIntoView({ behavior: 'smooth' });
		}
	}

	componentDidMount() {
		console.log('componentDidMount');
		window.addEventListener('resize', this.resize);
		this.scroll();
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
		window.removeEventListener('resize', this.resize);
	}

	componentDidUpdate() {
		console.log('componentDidUpdate');
		this.doResize();
		this.scroll();
	}

	render() {
		const { style = {}, children, id, className } = this.props;
		const scrollStyle = {
			overflowY: 'scroll',
			height: this.props.setHeight && this.props.setHeight(),
			...style
		};
		return (
			<div style={scrollStyle} id={id} className={className}>
				{children}
			</div>
		);
	}
}
