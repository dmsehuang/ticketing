import mongoose from 'mongoose';
import { Order, OrderStatus } from './order';

// A typescript thing
interface TicketAttrs {
  title: string;
  price: number;
}

// an instance of a model, typescript thing
// allows us to easily work with mongoose document
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

// a model is responsible for manipulating documents
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

// define what fields a schema has
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// this is what I don't understand
// it looks like there is a circular dependency here
// the "build" method is defined in the "model" interface, as an extension method
// however, in this case, we use the "ticket" model, which doesn't exist yet.
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};
ticketSchema.methods.isReserved = async function () {
  // this === the ticket document
  // Run query to look at all orders. Find an order where the ticket
  // is the ticket we just found *and* the orders status is *not* cancelled.
  // If we find an order from that, means the ticket *is* reserved.
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

// well, not necessarily a circular dependency, but
// if I defind the "build" method after this ticket model
// the build method won't be binded to the Ticket model!
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket, TicketDoc };
