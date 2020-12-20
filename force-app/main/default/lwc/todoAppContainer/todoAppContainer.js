import { LightningElement, api } from 'lwc';
import {createStore, combineReducers} from 'c/lwcRedux';
import reducers from 'c/todoAppReducer';
export default class TodoAppContainer extends LightningElement {
    @api store;
    initialize(){
        const combineReducersInstance = combineReducers(reducers);
        this.store = createStore(combineReducersInstance);
    }
}