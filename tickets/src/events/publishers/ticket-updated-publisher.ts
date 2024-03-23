import { Subjects, TicketUpdatedEvent, Publisher } from '@karidx/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
