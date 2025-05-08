import { ADD_TO_CART, 
    REMOVE_FROM_CART, 
    UPDATE_CART_ITEM_QUANTITY } from './action'

const initialState ={
    cart:[]
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
     case ADD_TO_CART:
        const productToAdd = { ...action.payload, quantity: 1 };
        const existingProductIndex = state.cart.findIndex((item) => item.id === productToAdd.id);
        if (existingProductIndex === -1) {
            //items does not exist in the case
            productToAdd.quantity=1;
            return { ...state, cart: [...state.cart, productToAdd] }
        }
        else {
            //items exist in the case
            const updatedCart =[...state.cart];
            updatedCart[existingProductIndex].quantity + 1;
            
              return { ...state, cart: updatedCart };
        } ;
     case REMOVE_FROM_CART:{
        const productId = action.payload;
        const updatedCart = state.cart.filter((item) => item.id !== productId);
        return { ...state, cart: updatedCart }
        }
     case UPDATE_CART_ITEM_QUANTITY:{
        const {productId,quantity} = action.payload;
        const updatedCart = state.cart.map((item) => 
            item.id !== productId ? item: {...item,quantity}
    );
         return {...state,cart:updatedCart} ;        
    }
    default:
        return state; 
} 
}
