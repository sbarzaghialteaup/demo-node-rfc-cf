const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8089;

const NodeRFC = require("./my-node-rfc");

let client;

async function connect(req, res) {
    try {
        client = await NodeRFC.open(req.body);
        res.type("json").send({ status: "CONNECTED" });
    } catch (error) {
        res.status(500).send({ status: "ERROR", message: error });
    }
}

async function callRFC(req, res) {
    try {
        const result = await NodeRFC.call(client, req.params.functionName, req.body);

        res.send(result);
    } catch (error) {
        res.status(500).send({ status: "ERROR", message: error });
    }
}

async function disconnect(req, res) {
    try {
        await NodeRFC.close(client);

        res.send({ status: "DISCONNECTED" });
    } catch (error) {
        res.status(500).send({ status: "ERROR", message: error });
    }
}

async function ping(req, res) {
    try {
        await NodeRFC.ping(client);

        res.send({ status: "PING OK", time: new Date().toJSON() });
    } catch (error) {
        res.status(500).send({ status: "ERROR", message: error });
    }
}

async function main() {
    let app = express();

    app.use(bodyParser.json());

    app.post("/connect", connect);
    app.post("/disconnect", disconnect);
    app.post("/ping", ping);
    app.post("/callRFC/:functionName", callRFC);

    app.listen(PORT, function () {
        console.log("Listening to port ..." + PORT);
    });
}

main();
