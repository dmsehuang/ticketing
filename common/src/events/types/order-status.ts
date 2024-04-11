export enum OrderStatus {
  /**
   * when the order has been created, but the ticket
   * it is trying to order has not been reserved
   */
  Created = 'created',

  /**
   * The ticket the order is trying to reserve has already
   * been reserved (others reserve it), or when the user has canclled the order.
   * The order expires before payment.
   * note: this is like the "default" scenario. You can also
   * split these status.
   */
  Cancelled = 'cancelled',

  /**
   * The order has successfully reserved the ticket
   */
  AwaitingPayment = 'awaiting:payment',

  /**
   * the order has reserved the ticket and the user has
   * provided payment successfully.
   */
  Complete = 'complete',
}
