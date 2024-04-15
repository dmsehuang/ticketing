import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketUpdatedEvent } from '@karidx/common';
import { Ticket } from '../../../models/ticket';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  // create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 200,
    title: 'ive',
  });

  await ticket.save();

  // create a fake data object - update
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    price: 250,
    version: ticket.version + 1,
    title: 'new title',
    userId: 'dmsehuang',
  };

  // create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all of this stuff
  return { listener, data, msg, ticket };
};

it('finds, updates, and saves a ticket', async () => {
  const { listener, data, msg, ticket } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket?.title).toEqual(data.title);
  expect(updatedTicket?.price).toEqual(data.price);
  expect(updatedTicket?.version).toEqual(data.version);
});

it('acks the message', async () => {
  const { listener, data, msg, ticket } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalledTimes(1);
});

it('does not call ack if the event has a skipped version number', async () => {
  const { listener, data, msg, ticket } = await setup();

  data.version = data.version + 10; // update version number

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
