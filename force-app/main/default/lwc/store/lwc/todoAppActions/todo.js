import {
  FETCH_TODO_LIST_SUCCESS,
  FETCH_TODO_LIST_ERROR,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  CHANGE_TODO_STATUS_SUCCESS,
  CHANGE_TODO_STATUS_ERROR,
  STATUS
} from 'c/todoAppConstant';
import getTaskList from '@salesforce/apex/TodoAppController.getTaskList';
import createTask from '@salesforce/apex/TodoAppController.createTask';
import updateTaskStatus from '@salesforce/apex/TodoAppController.updateTaskStatus';

export const fetchTodoList = () => {
  return async (dispatch) => {
    try {
      const data = await getTaskList();
      dispatch({
        type: FETCH_TODO_LIST_SUCCESS,
        payload: {data}
      });
    } catch(error) {
      dispatch({
        type: FETCH_TODO_LIST_ERROR,
        payload: {
          error: {
            ...error,
            message: error.message || (error.body && error.body.message),
          }
        }
      });
    }
  };
};

export const fetchTodoListIfNeeded = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.isFetching && !state.fetchResult) {
      dispatch(fetchTodoList());
    }
  }
}

export const addTodo = (content) => {
  return async (dispatch) => {
    try {
      const data = await createTask({content, status:STATUS.NOT_STARTED});
      dispatch({
        type: ADD_TODO_SUCCESS,
        payload: {data}
      });
    } catch(error) {
      dispatch({
        type: ADD_TODO_ERROR,
        payload: {
          error: {
            ...error,
            message: error.message || (error.body && error.body.message),
          }
        }
      });
    }
  };
};

export const changeTodoStatus = (recordId, status) => {
  return async (dispatch) => {
    try {
      const data = await updateTaskStatus({recordId, status});
      dispatch({
        type: CHANGE_TODO_STATUS_SUCCESS,
        payload: {data}
      });
    } catch(error) {
      dispatch({
        type: CHANGE_TODO_STATUS_ERROR,
        payload: {
          error: {
            ...error,
            message: error.message || (error.body && error.body.message),
          }
        }
      });
    }
  };
};