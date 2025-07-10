export class NoStockAvailable extends Error {
  constructor() {
    super("Stock unavailable for this product");
  }
}

export class MinimumQuantityReached extends Error {
  constructor() {
    super("Minimum quantity reached");
  }
}
