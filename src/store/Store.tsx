import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import favlistReducer from './reducers/favlist';
import watchlistReducer from './reducers/watchlist';
import topMoversReducer from './reducers/topmovers';
import newsReducer from './reducers/news';
import cartItemsReducer  from './reducers/cartItems';
const rootReducer = combineReducers({
    cartItems: cartItemsReducer,
    favlist: favlistReducer,
    watchlist: watchlistReducer,
    topMovers: topMoversReducer,
    news: newsReducer,
  });
  
  export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));