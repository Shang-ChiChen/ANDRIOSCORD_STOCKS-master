export default class Stock {
    id: number;
    name: string;
    symbol: string;
    price: number;
    percentChange: number;
    Updown:number;
  
    constructor(
      id: number,
      name: string,
      symbol: string,
      price: number,
      percentChange: number,
      Updown:number
    ) {
      this.id = id;
      this.name = name;
      this.symbol = symbol;
      this.price = price;
      this.percentChange = percentChange;
      this.Updown = Updown;
    }
  }
  