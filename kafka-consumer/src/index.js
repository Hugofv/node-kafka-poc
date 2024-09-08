const { Kafka } = require('kafkajs');

// Create a new Kafka instance and configure the broker(s)
const kafka = new Kafka({
  clientId: 'consumer-client',
  brokers: ['localhost:9093'],
});

// Create a consumer instance
const consumer = kafka.consumer({ groupId: 'consumer-client' }); // Assign a group ID

const run = async () => {
  // Connect to the consumer
  await consumer.connect();

  // Subscribe to the topic
  await consumer.subscribe({ topic: 'user-created', fromBeginning: true }); // Replace with your topic

  // Run the consumer to read messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(), // The message value
      });
    },
  });
};

// Handle any errors
run().catch(console.error);