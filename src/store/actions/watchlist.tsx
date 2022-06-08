import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { WatchlistState } from '../reducers/watchlist';
import Coin from '../../models/Coin';
import Stock from '../../models/Stock';
import cmpData from '../../data/CoinMarketCapData';
import sipData from '../../data/StockIconCapData';


export const SET_WATCHLIST_DATA = 'SET_WATCHLIST_DATA';





export const fetchCoinData = () => {
  return async (dispatch: ThunkDispatch<WatchlistState, void, Action>) => {
    // Will change when user can favorite coins
    const coins = ['BTC', 'XRP', 'BCH', 'ETH', 'DOGE', 'LTC'];
    const stocks = ['tse_2330.tw',
                    'tse_2317.tw',
                    'tse_2454.tw',
                    'tse_2412.tw',
                    'tse_2881.tw',
                    'tse_6505.tw',
                    'tse_2882.tw',
                    'tse_1303.tw',
                    'tse_2603.tw',
                    'tse_1301.tw',
                    'tse_2308.tw',
                    'tse_2002.tw',
                    'tse_2886.tw',
                    'tse_2303.tw',
                    'tse_2891.tw',
                    'tse_2884.tw',
                    'tse_1326.tw',
                    'tse_3711.tw',
                    'tse_2609.tw',
                    'tse_5880.tw',
                    'tse_2892.tw',
                    'tse_3045.tw',
                    'tse_1216.tw',
                    'tse_2615.tw',
                    'tse_5871.tw',
                    'tse_2883.tw',
                    'tse_2382.tw',
                    'tse_2880.tw',
                    'tse_2885.tw',
                    'tse_3037.tw',

                  ];
    try {
      const stocksResponse = await fetch( `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${stocks.join('|')}&json=1&delay=0`)
      const cryptoResponse = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
      );
      const cryptoResponseData = await cryptoResponse.json();
      const stocksResponseData = await stocksResponse.json();

      const stockData: Stock[] = [];
      stocks.forEach((stock,index) => {
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
        type: SET_WATCHLIST_DATA,
         coinData: stockData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updateCoinData = (newData: Stock[]) => {
  return async (dispatch: ThunkDispatch<WatchlistState, void, Action>) => {
    dispatch({
      type: SET_WATCHLIST_DATA,
      coinData: newData,
      //coinData: newData,
    });
  };
};
