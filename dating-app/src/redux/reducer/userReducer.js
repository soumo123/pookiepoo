import { USER_LOGIN_PENDING, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/userConstants'


const initialState = {
    user: {},
    userinfo:{},
    error: "",
};

const uerDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_PENDING:
            return { ...state, user: action.data,userinfo: action.data1};
        case USER_LOGIN_SUCCESS:
            return { ...state, user: action.data,userinfo: action.data1,error:false };
        case USER_LOGIN_FAIL:
            return {user: [] ,userinfo:[],error:true};
        default:
            return state;
    }
}


export default uerDetailsReducer;