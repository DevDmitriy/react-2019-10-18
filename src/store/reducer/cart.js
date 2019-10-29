export const cartReducer = (cartState = {}, action) => {
  if (action.type === 'ADD_TO_CART') {
    const {dishId} = action.payload
    const currentAmount = cartState[dishId] || 0
    return {
      ...cartState,
      [dishId]: currentAmount + 1,
    }
  }
  return cartState
}