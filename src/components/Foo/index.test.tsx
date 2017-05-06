import * as React from 'react';
import { Action } from 'redux';
import { expect, shallow, spy } from '../../../test';
import { Foo, mapState, mapDispatch } from '.';
import { Sheet } from "react-jss";

const fakeSheet = (...classNames: string[]) =>
    Object.assign({}, ...classNames.map(name => ({ [name]: '' })));

describe('<Foo />', () => {
    context('when given its required props', () => {
        const defaultProps = {
            fullName: 'John Smith',
            setFullName: spy(),
            classes: fakeSheet('card', 'container')
        };

        it('should render without error', () => {
            const wrapper = shallow(<Foo {...defaultProps} />);
            expect(wrapper).not.to.be.undefined;
        });

        it('should have a paragraph with certain text', () => {
            const wrapper = shallow(<Foo {...defaultProps} />);
            expect(wrapper).to.have.descendants('p');

            const p = wrapper.find('p');
            expect(p.text()).to.eq('My full name is John Smith!');
        });

        it('should have a button element with certain text', () => {
            const wrapper = shallow(<Foo {...defaultProps} />);
            expect(wrapper).to.have.descendants('button');

            const button = wrapper.find('button');
            expect(button.text()).to.eq(`Set full name to 'John Smith'`)
        });

        it('should call setFullName() action when button clicked', () => {
            const wrapper = shallow(<Foo {...defaultProps} />);
            const button = wrapper.find('button');
            button.simulate('click');
            expect(defaultProps.setFullName.called).to.be.true;
        });
    });

    context('When used with redux', () => {
        const fakeDispatch = (action: Action) => action;
        const fakeState = {
            user: { fullName: 'John Smith' }
        };

        it('mapState() should return a valid object', () => {
            const props = mapState(fakeState);
            expect(props.fullName).to.eq('John Smith');
        });

        it('mapDispatch should have the required actions', () => {
            expect(mapDispatch).to.have.property('setFullName');
        });
    });
});
