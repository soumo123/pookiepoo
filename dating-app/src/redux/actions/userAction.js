import { USER_LOGIN_PENDING, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL} from '../constants/userConstants'

export const userLoginPending = () => {
    try {

        return {
            type: USER_LOGIN_PENDING,
            data: null,
            data1:null
        };
    } catch (error) {
        console.log(error)
    }

};
export const userLoginSuccess = (data,data1) => {
    try {

        return {
            type: USER_LOGIN_SUCCESS,
            data: data,
            data1:data1
        };
    } catch (error) {
        console.log(error)
    }

};

export const userLoginFail = (error) => {
    return {
        type: USER_LOGIN_FAIL,
        data: [],
        data1:[]
    };
};
