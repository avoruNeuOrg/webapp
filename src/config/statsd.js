const StatsD = require('node-statsd');
const client = new StatsD('localhost', 8125);

module.exports = client;

