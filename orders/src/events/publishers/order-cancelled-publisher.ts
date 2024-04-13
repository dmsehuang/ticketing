import { Publisher, OrderCancelledEvent, Subjects } from '@karidx/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
