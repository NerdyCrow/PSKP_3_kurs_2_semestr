const redis = require("redis");
(async () => {
 const client = redis.createClient({ url: 'redis://localhost:6379/'})

  client.on('ready',()=>{
  console.log("ready");
  console.time('hset');
  for (let i = 0; i < 10000; i++){
      client.hSet(`${i}`,`value`,`val-${i}`);
  }
  console.timeEnd('hset');
  
  
  console.time('hget');
  for (let i = 0; i < 10000; i++){
      client.hGet(`${i}`,'value');
  }
  console.timeEnd('hget');
});
  client.on('connect',()=>{console.log('connect')});
  client.on('end',()=>{console.log('end')});
  await client.connect();
  setTimeout(()=>{client.quit()},1500);
})();