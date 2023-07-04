import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import FundCard from "./FundCard";
import Loader from "./Loader";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(campaigns);
  }, []);

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.pId}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && <Loader />}

        {!isLoading && campaigns.length === 0 && (
          <div>
            <p className="font-epilogue font-bold text-[30px] leading-[35px] text-[#818183]">
              You need to have an active metamask account to view campaigns
            </p>
            <p className="font-epilogue font-semibold text-[15px] leading-[30px] text-[#818183]">
              You are not connected or have not created any campigns yet from
              this account
            </p>
          </div>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.title}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
