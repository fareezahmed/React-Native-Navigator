import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    EMPLOYEE_UPDATED, 
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
    // console.log(`Prop ${prop} Value ${value}`);

    return {
        type: EMPLOYEE_UPDATED,
        payload: { prop, value }
    };
};

export const employeeCreate = ({ name, phone, shift }) => {
    console.log(`name ${name} phone ${phone} shift ${shift}`);

    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .push({ name, phone, shift })
        .then(() => {
            dispatch({
                type: EMPLOYEE_CREATE,
            });
            Actions.employeeList({ type: 'reset' });
        });
    };
};

export const employeeFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .on('value', snapshot => {
            dispatch({
                type: EMPLOYEES_FETCH_SUCCESS,
                payload: snapshot.val()
            });
        });
    };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .set({ name, phone, shift })
        .then(() => {
            Actions.employeeList({ type: 'reset' });
            dispatch({
                type: EMPLOYEE_SAVE_SUCCESS
            });
        });
    };
};
