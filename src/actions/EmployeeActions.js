import { EMPLOYEE_UPDATED } from './types';

export const employeeUpdate = ({ prop, value }) => {
    console.log(`Prop ${prop} Value ${value}`);
    
    return {
        type: EMPLOYEE_UPDATED,
        payload: { prop, value }
    };
};
