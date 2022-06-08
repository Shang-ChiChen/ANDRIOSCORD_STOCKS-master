import { AnyAction } from 'redux';
import Stock from '../../models/Stock';
import Coin from '../../models/Coin';
import { SET_FAVLIST_DATA } from '../actions/favlist';

export interface FavlistState {
  favlistData: Coin[];
}

const initialState: FavlistState = {
  favlistData: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_FAVLIST_DATA:
      return {
        favlistData: action.coinData,
      };
  }
  return state;
};
