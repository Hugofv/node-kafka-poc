const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'consumer-client',
  brokers: ['kafka1:9092', 'kafka2:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

await consumer.connect();
await consumer.subscribe({ topic: 'subscription', fromBeginning: true });

await consumer.run({
  /**
   * This function is a callback provided to the Kafka consumer's `run` method.
   * It is executed for each message consumed by the consumer.
   *
   * @param {Object} payload - The payload object containing information about the consumed message.
   * @param {string} payload.topic - The topic from which the message was consumed.
   * @param {number} payload.partition - The partition from which the message was consumed.
   * @param {Object} payload.message - The Kafka message object.
   * @param {Buffer} payload.message.value - The value of the message.
   * @param {number} payload.message.offset - The offset of the message in the partition.
   * @param {number} payload.message.timestamp - The timestamp of the message.
   *
   * @returns {void}
   */
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message,
    });
  },
});
