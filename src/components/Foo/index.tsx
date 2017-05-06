import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../types';
import { UserAction } from '../../actions/user';
import * as userActions from '../../actions/user';
import styles from './styles';
import { Sheet } from 'react-jss';
import injectStyles from '../../util/jss';

import Stuff from '../Stuff';

export interface Props {
    fullName: string;
}

type Styles = Sheet<typeof styles>;

export interface Actions {
    setFullName: (fullName: string) => UserAction;
}

export const Foo: React.SFC<Props & Actions & Styles> = props => (
    <div className={props.classes.card}>
        <p>My full name is {props.fullName}!</p>
        <button onClick={() => props.setFullName('John Smith')}>
            Set full name to 'John Smith'
        </button>
        <hr />
        <div className={props.classes.container}>
            <Stuff textColor="lightgreen" />
        </div>
    </div>
);

export const mapState = (state: State) => ({
    fullName: state.user.fullName
});

export const mapDispatch = {
    ...userActions
};

export default connect(mapState, mapDispatch)(
    injectStyles(styles)<Props>(Foo)
);
