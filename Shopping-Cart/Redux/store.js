import { cartReducer } from "./reducers";
import { createStore} from 'redux';

const store =createStore(cartReducer);

export default store;