import { Publisher, Subjects, TicketCreatedEvent } from '@karidx/common';

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

export default TicketCreatedPublisher;
