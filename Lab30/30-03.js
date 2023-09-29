const express = require("express");
const fs = require("fs");

const app = express();

app.use("/", express.static("."));

const wasmCode = fs.readFileSync("p.wasm");
const wasmImports = {};
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);

app.get("/", (req, res, next) => {
  res
    .type("html")
    .send(
      `<p>sum(15, 37) = ${wasmInstance.exports.sum(15, 37)}</p>` +
      `<p>mul(5, 15) = ${wasmInstance.exports.mul(15, 5)}</p>` +
      `<p>sub(15, 3) = ${wasmInstance.exports.sub(15, 3)}</p>`
    );
});

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
