pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ReLike.sol";

contract TestReLike {

//  function testGetEntityUsingDeployedContract() {
//    ReLike meta = ReLike(DeployedAddresses.ReLike());
//
//    uint expected = 2;
//
//    Assert.equal(
//      meta.getEntity('abc').length,
//      expected,
//      "getEntity should return 2 items: likes, and dislikes."
//    );
//  }

  function testGetEntityReturnsCorrectItems() {
    ReLike meta = new ReLike();

    uint expected = 2;

    Assert.equal(
      meta.getEntity('abc').length,
      expected,
      "getEntity should return 2 items: likes, and dislikes."
    );
  }

}
