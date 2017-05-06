import * as React from 'react';
import { expect } from '../../test';
import * as userActions from './user';

describe('Redux "user" action creators', () => {
    context('When called', () => {
        it('setFullName() should return a certain redux action', () => {
            const expected = { type: 'USER_SET_FULLNAME', fullName: 'Dave' };
            const result = userActions.setFullName('Dave');
            expect(result).to.deep.eq(expected);
        });
    });
});
