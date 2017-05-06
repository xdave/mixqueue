import { UserAction } from '../actions/user';

export const initial = { fullName: 'Unknown' };

export const user = (state = initial, action: UserAction) => {
    switch (action.type) {
        case 'USER_SET_FULLNAME':
            return {
                ...state,
                fullName: action.fullName
            };
        default:
            return state;
    }
};
