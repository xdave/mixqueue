import { expect } from '../../test';
import { user } from './user';
import * as userActions from '../actions/user';

describe('The redux user reducer', () => {
    context('when provided an action', () => {
        it('should return updated state', () => {
            const state = { fullName: 'Unknown' };
            const action = { type: 'USER_SET_FULLNAME', fullName: 'John' };
            const expected = { fullName: 'John' };
            const result = user(state, action as userActions.UserAction);
            expect(result).to.deep.eq(expected);
        });

        it('should return same state if unhandled action', () => {
            const expected = { fullName: 'John' };
            const action = { type: 'UNKNOWN_ACTION' };
            const result = user(expected, action as userActions.UserAction);
            expect(result).to.deep.eq(expected);
        });

        it('should still work if no initial state is provided', () => {
            const expected = { fullName: 'Unknown' };
            const action = { type: 'UNKNOWN_ACTION' };
            const result = user(undefined, action as userActions.UserAction);
            expect(result).to.deep.eq(expected);
        });
    });
});
