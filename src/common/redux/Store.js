import {createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

class Store {
    constructor() {
        this._store = createStore(reducers);
    }
}

export default Store;
