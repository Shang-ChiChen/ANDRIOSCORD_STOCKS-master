import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { FavlistState } from '../reducers/favlist';
import Coin from '../../models/Coin';
import Stock from '../../models/Stock';
import cmpData from '../../data/CoinMarketCapData';
import sipData from '../../data/StockIconCapData';
import {store} from '../Store';

export const SET_FAVLIST_DATA = 'SET_FAVLIST_DATA';

export const fetchCoinData = () => {
  return async (dispatch: ThunkDispatch<FavlistState, void, Action>) => {
    // Will change when user can favorite coins
    const coins = ['BTC', 'XRP', 'BCH', 'ETH', 'DOGE', 'LTC'];
    const stocks = ['tse_2330.tw'];
    const myStringArr = store.getState().cartItems;
    try {
      const stocksResponse = await fetch( `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${myStringArr.join('|')}&json=1&delay=0`)
      const cryptoResponse = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
      );
      const cryptoResponseData = await cryptoResponse.json();
      const stocksResponseData = await stocksResponse.json();

      const stockData: Stock[] = [];
      myStringArr.forEach((stock,index) => {
        // Find ID from CMP data, if it doesn't exist use 1
        console.log(stocksResponseData);
        const stockDetails = stocksResponseData.msgArray[index];

        const sipDetails = sipData.data.find(
          (sipStock) => stockDetails.c === sipStock.symbol
        );

        const stockID = sipDetails?.id ?? 0;

        const stockName = stockDetails.n;
        const stockSymbol = stock.substring(4,8);
        //const stockPrice = Number(stockDetails.pz);PZ第一版
        //const stockPrice = Number((stockDetails.a).substring(0,5));PZ第二版
        //const stockChange = Number(stockDetails.z)-Number(stockDetails.y);

        const stockB = (stockDetails.b).substring( 0, (stockDetails.b).indexOf("_")  );
        const stockPrice = Number(stockDetails.z == "-" ?  stockB : stockDetails.z);

        const stockChange = stockPrice-Number(stockDetails.y);
        const stockUpdown = (stockChange/stockDetails.y)*100
        stockData.push(
          new Stock(
            stockID,
            stockName,
            stockSymbol,
            stockPrice,
            stockChange,
            stockUpdown
          )
        );
      });

      const coinData: Coin[] = [];
      coins.forEach((coin) => {
        // Find ID from CMP data, if it doesn't exist use 1
        const coinDetails = cryptoResponseData.RAW[coin].USD;
        const cmpDetails = cmpData.data.find(
          (cmpCoin) => coinDetails.FROMSYMBOL === cmpCoin.symbol
        );
        const coinID = cmpDetails?.id ?? 0;
        const coinName = cmpDetails?.name ?? 'Unknown';
        coinData.push(
          new Coin(
            coinID,
            coinName,
            coin,
            coinDetails.PRICE,
            coinDetails.CHANGEPCT24HOUR
          )
        );
      });

      dispatch({
        type: SET_FAVLIST_DATA,
         coinData: stockData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updateCoinData = (newData: Stock[]) => {
  return async (dispatch: ThunkDispatch<FavlistState, void, Action>) => {
    dispatch({
      type: SET_FAVLIST_DATA,
      coinData: newData,
      //coinData: newData,
    });
  };
};
