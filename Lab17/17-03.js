const redis = require("redis");

(async () => {
 const client = redis.createClient({ url: 'redis://localhost:6379/'})

  client.on('ready',()=>{
  console.log("ready");
  client.set('incr',0);
  console.time('incr');
  for (let i = 0; i < 10000; i++){
      client.incr('incr');
  }
  console.timeEnd('incr');
  
  console.time('decr');
  for (let i = 0; i < 10000; i++){
      client.decr('incr');
  }
  console.timeEnd('decr');
});
  client.on('connect',()=>{console.log('connect')});
  client.on('end',()=>{console.log('end')});
  await client.connect();
  setTimeout(()=>{client.quit()},1500);
})();