var redis = require("redis");
(async () => {
var publisher = redis.createClient({ url: 'redis://localhost:6379/' });
await publisher.connect();

const subscriber = redis.createClient({ url: 'redis://localhost:6379/' });


await subscriber.connect();
subscriber.on('error', err => console.error(err));

subscriber.subscribe('channel1', (message, channel) => console.log("сообщение: " + message));
publisher.publish("channel1", "message");
})();
