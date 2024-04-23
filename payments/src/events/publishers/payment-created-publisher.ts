import { PaymentCreatedEvent, Subjects, Publisher } from '@karidx/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
