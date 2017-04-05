import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    TASK_UPDATE,
    TASK_CREATE,
    TASKS_FETCH_SUCCESS,
    TASK_SAVE_SUCCESS
} from './types';



export const taskUpdate = ({ prop, value }) => {
    return {
        type: TASK_UPDATE,
        payload: { prop, value }
    };
};

export const taskCreate = ({ name, address, taskType, equipment, phone }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/tasks/`+ currentUser.uid)
            .push({ name, address, taskType, equipment, phone })
            .then(() => {
                dispatch({ type: TASK_CREATE });
                Actions.taskList({ type: 'reset' });
            });
    };
};

export const tasksFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/tasks/`+ currentUser.uid)
            .on('value', snapshot => {
                dispatch({ type: TASKS_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const taskSave = ({ name, address, taskType, equipment, phone }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/tasks/`+ currentUser.uid)
            .set({ name, address, taskType, equipment, phone })
            .then(() => {
                dispatch({ type: TASK_SAVE_SUCCESS });
                Actions.taskList({ type: 'reset' });
            });
    };
};

export const taskDelete = ({ firstName, lastName, type, number, street, phone, equipment, uid }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`/tasksCompleted/`+ currentUser.uid)
            .push({ firstName, lastName, type, number, street, phone, equipment})
        firebase.database().ref(`/tasks/${currentUser.uid}/${uid}`)
            .remove()
            .then(() => {
                Actions.taskList({ type: 'reset' });
            });
    };
};

