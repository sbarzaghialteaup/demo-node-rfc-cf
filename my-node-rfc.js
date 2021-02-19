const Client = require("node-rfc").Client;

async function open(abapConnection) {
    const client = new Client(abapConnection);

    await client.open();

    return client;
}

async function call(client, functionName, importData) {
    return await client.call(functionName, importData);
}

async function close(client) {
    return await client.close();
}

async function ping(client) {
    return await client.ping();
}

module.exports.open = open;
module.exports.call = call;
module.exports.close = close;
module.exports.ping = ping;
