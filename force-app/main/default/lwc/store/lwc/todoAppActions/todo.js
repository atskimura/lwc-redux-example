import {
  FETCH_TODO_LIST_SUCCESS,
  FETCH_TODO_LIST_ERROR,
  ADD_TODO,
  CHANGE_TODO_STATUS,
  STATUS
} from 'c/todoAppConstant';
import getTaskList from '@salesforce/apex/TodoAppController.getTaskList';
let nextTodoId = 0;

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

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const changeTodoStatus = (id, status )=> ({
  type: CHANGE_TODO_STATUS,
  payload: { id, status }
});