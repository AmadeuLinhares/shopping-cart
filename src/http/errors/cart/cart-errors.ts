export class NoStockAvailable extends Error {
  constructor() {
    super("Stock unavailable for this product");
  }
}
