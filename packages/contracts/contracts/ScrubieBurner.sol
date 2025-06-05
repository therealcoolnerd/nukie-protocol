// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title ScrubieBurner - example token burner
/// @notice Burns an ERC20 token by transferring to the dead address
contract ScrubieBurner {
    IERC20 public immutable scrubToken;
    address public constant DEAD_ADDRESS = address(0x000000000000000000000000000000000000dEaD);

    event Burn(address indexed burner, uint256 amount);

    constructor(address tokenAddress) {
        scrubToken = IERC20(tokenAddress);
    }

    /// @notice Burn tokens from the caller
    /// @param amount Amount to burn
    function burn(uint256 amount) external {
        require(scrubToken.transferFrom(msg.sender, DEAD_ADDRESS, amount), "BURN_FAILED");
        emit Burn(msg.sender, amount);
    }
}
