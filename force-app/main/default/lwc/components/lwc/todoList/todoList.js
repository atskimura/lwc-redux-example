import { LightningElement } from 'lwc';
import { Redux } from 'c/lwcRedux';
import {todo} from 'c/todoAppActions';

export default class TodoList extends Redux(LightningElement) {
    mapStateToProps(state){
        const { filter, todo } = state;
        let allIds;
        if(filter != 'All'){
            allIds = todo.allIds.filter(id => todo.byIds[id].status == filter)
        }else{
            allIds = todo.allIds
        }      
        const fetchResult = todo.fetchResult;
        return {allIds, fetchResult}
    }
    mapDispatchToProps(){
        return {fetchTodoListIfNeeded : todo.fetchTodoListIfNeeded};
    }
    get hasRecord(){
        return this.props.allIds && this.props.allIds.length > 0
    }
    get error() {
        return this.props.fetchResult && this.props.fetchResult.error;
    }

    connectedCallback() {
      super.connectedCallback();
      this.props.fetchTodoListIfNeeded();
    }
}