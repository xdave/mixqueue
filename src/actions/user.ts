export type UserAction
    = { type: 'USER_SET_FULLNAME', fullName: string; };

export const setFullName = (fullName: string) => ({
    type: 'USER_SET_FULLNAME',
    fullName
}) as UserAction;
