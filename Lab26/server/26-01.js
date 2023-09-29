const https = require("https");
const fs = require("fs");

const options = {
  passphrase: "1234",
  key: fs.readFileSync("LAB.key").toString(),
  cert: fs.readFileSync("Resource.crt").toString(),
};
const server = https.createServer(options, (req, res) => {
  const date = new Date();
  res.end(`Lab26 ${date.toLocaleString()}`);
});
server.listen(8443, () => {
  console.log('Server listen on port 8443');
});
