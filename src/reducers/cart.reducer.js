export const cartActions = {
  addItem: "addItem",
};

const initialState = {
  cart: [],
  isCartOpen: false,
  isCartSyncing: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "open":
      return {
        ...state,
        isCartOpen: true,
      };
    case "close":
      return {
        ...state,
        isCartOpen: false,
      };
    case "sync":
      return {
        ...state,
        isCartSyncing: true,
      };
    case "notSyncing":
      return {
        ...state,
        isCartSyncing: false,
      };
    case "update":
      return {
        ...state,
        cart: action.cart,
      };
    case "error":
      return {
        ...state,
        error: action.error,
        isCartSyncing: false,
      };

    case cartActions.addItem: {
      const inventoryItem = action.inventory.find(
        (item) => item.id === action.id,
      );

      if (!inventoryItem) {
        console.error("cart error: item not found");
        return state;
      }

      const itemToUpdate = state.cart.find(
        (item) => item.productId === action.id,
      );
      let updatedCartItem;
      if (itemToUpdate) {
        updatedCartItem = {
          ...itemToUpdate,
          quantity: itemToUpdate.quantity + 1,
        };
      } else {
        updatedCartItem = {
          ...inventoryItem,
          quantity: 1,
          productId: inventoryItem.id,
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart.filter((item) => item.productId !== action.id),
          updatedCartItem,
        ],
      };
    }

    default:
      return state;
  }
}

export { initialState, reducer };
