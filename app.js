const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const routes = require(path.join(__dirname,"./routes/route.js"));

app.use(express.json());
app.use(routes);

app.listen(port,()=>{
    console.log(`Sunucu http://localhost:${port} üzerinde dinleniyor`);
});