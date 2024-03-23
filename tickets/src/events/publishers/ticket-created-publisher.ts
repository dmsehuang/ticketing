import { Subjects, TicketCreatedEvent, Publisher } from '@karidx/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
