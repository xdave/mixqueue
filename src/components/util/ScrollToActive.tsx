import * as React from 'react'

export interface ScrollProps {
    activeClass: string;
    containerClass: string;
    force?: boolean;
}

export interface ScrollState {
    scrolled: boolean;
}

class ScrollToActive extends React.Component<ScrollProps, ScrollState> {
    constructor(props: ScrollProps) {
        super(props);
        this.setState({ scrolled: false });
    }
    scroll(el: HTMLElement) {
        const { containerClass, activeClass, force } = this.props;
        const { scrolled } = this.state;
        if (el && (!scrolled || force)) {
            const parent = el.closest(`.${containerClass}`) as HTMLElement;
            if (parent) {
                const item = parent.querySelector(`.${activeClass}`) as HTMLElement;
                if (item) {
                    const listHeight = parent.offsetHeight;
                    const itemHeight = item.getBoundingClientRect().height;
                    const amount = listHeight - itemHeight;
                    parent.scrollTop = item.offsetTop - amount;
                    this.setState({ scrolled: true });
                    // console.log('Scrolled to top', listHeight, itemHeight, amount);
                }
            }
        }
    }
    render() {
        return (
            <div ref={el => this.scroll(el)}>
                {this.props.children}
            </div>
        );
    }
}

export default ScrollToActive;
