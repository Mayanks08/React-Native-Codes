
export const ADD_TO_CART = 'add to cart' ;
export const REMOVE_FROM_CART = 'remove from cart' ;
export const UPDATE_CART_ITEM_QUANTITY = 'update cart' ;

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload:product
});
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId

});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: {
    productId, quantity
  }
  
})


