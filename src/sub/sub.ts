import amqplib from "amqplib/callback_api";

amqplib.connect("amqp://localhost", (error, connection) => {
  if (error) {
    throw error;
  }
  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }
    const queue = "hello";
    channel.assertQueue(queue, { durable: false });
    channel.consume(queue, (message) => {
      console.log(`[x] Received ${message?.content.toString()}`);
    }, {
      noAck: true,
    });
  });
});
