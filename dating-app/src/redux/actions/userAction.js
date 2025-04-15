import { USER_LOGIN_PENDING, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL} from '../constants/userConstants'

export const userLoginPending = () => {
    try {

        return {
            type: USER_LOGIN_PENDING,
            data: null,
        };
    } catch (error) {
        console.log(error)
    }

};
export const userLoginSuccess = (data) => {
    try {

        return {
            type: USER_LOGIN_SUCCESS,
            data: data,
        };
    } catch (error) {
        console.log(error)
    }

};

export const userLoginFail = (error) => {
    return {
        type: USER_LOGIN_FAIL,
        data: [],
    };
};
