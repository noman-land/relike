const ReLike = artifacts.require('./ReLike.sol');

module.exports = function deployContracts(deployer) {
  deployer.deploy(ReLike);
};
