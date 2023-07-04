import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns, Loader } from "../components";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaings] = useState([]);
  const { getUserCampaigns, address, contract } = useStateContext();

  const fetchCamps = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaings(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract && address) fetchCamps();
  }, [address, contract]);

  return !isLoading ? (
    <DisplayCampaigns
      title="Your campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  ) : (
    <Loader />
  );
};

export default Profile;
