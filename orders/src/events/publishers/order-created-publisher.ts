import { Publisher, OrderCreatedEvent, Subjects } from '@karidx/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
