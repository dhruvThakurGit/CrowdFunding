// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string desc;
        uint256 target;
        uint256 current;
        uint256 deadline;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public noOfCampaign = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _desc,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[noOfCampaign];

        require(campaign.deadline < block.timestamp, " Future date ");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.desc = _desc;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;
        campaign.current = 0;

        noOfCampaign++;

        return noOfCampaign - 1;
    }

    function donateCampaign(uint256 _id) public payable {
        uint amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.current = campaign.current + amount;
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](noOfCampaign);

        for (uint256 index = 0; index < noOfCampaign; index++) {
            Campaign storage item = campaigns[index];

            allCampaigns[index] = item;
        }

        return allCampaigns;
    }
}

// https://thirdweb.com/sepolia/0x9eDB4D135641A9c15e1f5Ad6c859800954447d31
