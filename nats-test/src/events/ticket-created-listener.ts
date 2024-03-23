import { Message } from 'node-nats-streaming';
import { Listener, TicketCreatedEvent, Subjects } from '@karidx/common';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';
  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Event data!', data);

    console.log(data.id);
    console.log(data.price);

    msg.ack();
  }
}

export default TicketCreatedListener;
