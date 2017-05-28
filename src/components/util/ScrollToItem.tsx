import * as React from 'react';
import { findDOMNode } from 'react-dom';

export const isScrolledIntoView = (parent: HTMLElement, item: HTMLElement) => {
	const { top, bottom } = item.getBoundingClientRect();
	const parentHeight = parent.getBoundingClientRect().height;
	const isVisible = (top >= 0) && (bottom <= parentHeight);
	return isVisible;
};

export interface Props {
	id?: string;
	className?: string;
	style?: any;
	itemSelector: string;
	setHeight?: Function;
}

export default class ScrollToItem extends React.Component<Props, {}> {
	shouldScroll: boolean;

	resize = () => {
		this.forceUpdate();
		if (this.props.setHeight) {
			const el = findDOMNode(this) as HTMLElement;
			el.style.height = this.props.setHeight();
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.resize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize);
	}

	componentWillUpdate() {
		const selector = `.${this.props.itemSelector}`;
		const el = findDOMNode(this) as HTMLDivElement;
		const item = el.querySelector(selector) as HTMLElement;
		if (item) {
			return (!isScrolledIntoView(el, item));
		}
	}
	componentDidUpdate() {
		if (this.props.setHeight) {
			const el = findDOMNode(this) as HTMLElement;
			el.style.height = this.props.setHeight();
		}
		if (this.shouldScroll) {
			const selector = `.${this.props.itemSelector}`;
			const el = findDOMNode(this) as HTMLDivElement;
			const item = el.querySelector(selector) as HTMLElement;
			if (item) {
				item.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}
	shouldComponentUpdate() {
		this.shouldScroll = true;
		this.componentDidUpdate();
	}

	render() {
		const { style = {}, children, id, className } = this.props;
		const scrollStyle = {
			overflowY: 'scroll',
			...style
		};
		return (
			<div style={scrollStyle} id={id} className={className}>
				{children}
			</div>
		);
	}
}
