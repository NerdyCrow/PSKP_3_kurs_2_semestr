const redis = require("redis");


(async () => {
 const client = redis.createClient({ url: 'redis://localhost:6379/'})

  client.on('ready',()=>{console.log('ready')
  console.time("set");
  for (let i = 0; i < 10000; i++) {
    client.set(`${i}`, `set${i}`);
  }
  console.timeEnd("set");

  console.time("get");
  for (let i = 0; i < 10000; i++) {
    client.get(`${i}`);
  }
  console.timeEnd("get");

  console.time("delete");
  for (let i = 0; i < 10000; i++) {
   client.del(`${i}`);
  }
  console.timeEnd("delete");
});
  client.on('connect',()=>{console.log('connect')});
  client.on('end',()=>{console.log('end')});
  await client.connect();
  setTimeout(()=>{client.quit()},1500);
})();