import amqplib from 'amqplib/callback_api';

amqplib.connect(
  "amqp://localhost" ,
  (error , connection) => {
    if (error) {
      throw error;
    }
    connection.createChannel(
      (error , channel) => {
        if (error) {
          throw error;
        }
        const queue = "hello";
        const message = "Hello World!";
        channel.assertQueue(queue , { durable: false });
        channel.sendToQueue(queue , Buffer.from(message));
        console.log(`[x] Sent ${message}`);
      }
    );
    setTimeout(() => {
      connection.close();
      process.exit(0);
    } , 5000);
  }

)
