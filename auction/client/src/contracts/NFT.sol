//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.3;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/utils/Counters.sol";

contract myNFT is ERC721 {
    uint public newTokenId;
    address admin;

    constructor() ERC721("metaLifeNFT", "MLNFT") {
        admin = msg.sender;
    }

    function mint(address owner) public {
        _safeMint(owner, newTokenId);
        newTokenId++;
    }
}