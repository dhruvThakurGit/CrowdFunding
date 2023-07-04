import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns, Loader } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaings] = useState([]);
  const { getCampaigns, address, contract } = useStateContext();

  const fetchCamps = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaings(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract && address) fetchCamps();
  }, [address, contract]);

  return !isLoading ? (
    <DisplayCampaigns
      title="All campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  ) : (
    <Loader />
  );
};

export default Home;
