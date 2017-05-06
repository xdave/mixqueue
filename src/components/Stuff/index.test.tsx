import * as React from 'react';
import { Action } from 'redux';
import { expect, shallow, spy } from '../../../test';
import { Stuff, colorSelector } from '.';

const fakeSheet = (...classNames: string[]) =>
    Object.assign({}, ...classNames.map(name => ({ [name]: '' })));

describe('<Stuff />', () => {
    context('when given its required props', () => {
        const styles = fakeSheet('thinger');

        it('should render without error', () => {
            const wrapper = shallow(<Stuff classes={styles} />);
            expect(wrapper).not.to.be.undefined;
        });
    });

    context('The colorSelector()', () => {
        it('should return the props provided textColor', () => {
            const result = colorSelector({ textColor: 'blue' });
            expect(result).to.eq('blue');
        });

        it('should return something else otherwise', () => {
            const result = colorSelector({});
            expect(result).to.eq('#fff');
        });
    });
});
