// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;
contract RubixReward {
    mapping(address => uint) reward_data;

    function reward(address addr) public {
        // current_reward = reward_data[addr];
        // current_reward = current_reward + 10;
        reward_data[addr] += 10;
    }
    function get(address addr) public view returns (uint) {
        return reward_data[addr];
    }
}
