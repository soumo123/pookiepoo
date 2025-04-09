import { USER_LOGIN_PENDING, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/userConstants'


const initialState = {
    user: {},
    error: "",
};

const uerDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_PENDING:
            return { ...state, user: action.data };
        case USER_LOGIN_SUCCESS:
            return { ...state, user: action.data };
        case USER_LOGIN_FAIL:
            return { ...state, user: action.data };
        default:
            return state;
    }
}


export default uerDetailsReducer;