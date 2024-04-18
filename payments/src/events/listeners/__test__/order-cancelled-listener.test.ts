import { OrderCancelledListener } from '../order-cancelled-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Order } from '../../../models/order';
import mongoose from 'mongoose';
import { OrderCancelledEvent, OrderStatus } from '@karidx/common';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  // init order, will need to cancell it
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'dmsehuang',
    price: 10,
  });
  await order.save();

  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1, // previous version + 1
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

it('updates the status of the order to canncelled', async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it('acks the message', async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});