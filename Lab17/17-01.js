const redis=require('redis');

(async () => {
  const client = redis.createClient({ url: 'redis://localhost:6379/'})
  client.on('error', (err) => console.log('Redis Client Error', err));
  client.on('ready',()=>{console.log('ready')});
  client.on('connect',()=>{console.log('connect')});
  client.on('end',()=>{console.log('end')});
  await client.connect();
  await client.quit();
})();
