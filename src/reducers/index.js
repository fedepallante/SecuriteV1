import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TaskFormReducer from './TaskFormReducer';
import TaskReducer from './TaskReducer';

export default combineReducers({
  auth: AuthReducer,
  taskForm: TaskFormReducer,
  tasks: TaskReducer
});
