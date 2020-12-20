import {
    FETCH_TODO_LIST,
    FETCH_TODO_LIST_SUCCESS,
    FETCH_TODO_LIST_ERROR,
    ADD_TODO,
    CHANGE_TODO_STATUS,
    STATUS
} from 'c/todoAppConstant';

const initialState = {
    allIds: [],
    byIds: {},
    isFetching: false,
    fetchResult: undefined
};

const todo = (state = initialState, action) => {
    switch (action.type) {
       case FETCH_TODO_LIST: {
        return {
            ...state,
            isFetching: true
        };
       }
       case FETCH_TODO_LIST_SUCCESS: {
        const { data } = action.payload;
        return {
            ...state,
            isFetching: false,
            allIds: data.map(todo => todo.Id),
            byIds: data.reduce((acc, todo) => {
                acc[todo.Id] = {
                    content: todo.Subject,
                    status: todo.Status
                };
                return acc;
            }, {}),
            fetchResult: { data }
        };
       }
       case FETCH_TODO_LIST_ERROR: {
        const { error } = action.payload;
        return {
            ...state,
            isFetching: false,
            fetchResult: { error }
        };
       }
       case ADD_TODO: 
        const { id, content } = action.payload;
        return {
            ...state,
            allIds: [...state.allIds, id],
            byIds: {
                ...state.byIds,
                [id]: {
                    content,
                    status: STATUS.NOT_STARTED
                }
            }
        };
       case CHANGE_TODO_STATUS: {
        const { id, status } = action.payload;
        return {
            ...state,
            byIds: {
              ...state.byIds,
              [id]: {
                ...state.byIds[id],
                status: status
              }
            }
          };
       }
       default: return state;
    }
}

export default todo;