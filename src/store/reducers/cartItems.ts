const cartItems = (state = [], action) => {
  switch (action.type) {
      case 'ADD_TO_CART':
          return [...state, action.payload];
  }

  return state;
}

export default cartItems;