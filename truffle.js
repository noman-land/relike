// Allows ES6 use in migrations and tests.
require('babel-register');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },
    ropsten: {
      host: 'localhost',
      port: 8545,
      network_id: 3,
    },
  },
};
