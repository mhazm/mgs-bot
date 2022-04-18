const express = require('express');
const app = express();
const port = 3000
const auth = require('./auth');
const discord = require('./discord');

app.listen(port, () => {
    console.log(`App Listening on port:${port}`)
});

app.get("/", async (req, res) => {
    res.sendStatus(200);
});

app.use("/auth", auth);
app.use("/discord", discord);
