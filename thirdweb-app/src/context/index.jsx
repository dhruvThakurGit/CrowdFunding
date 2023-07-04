import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x6aF38F76c9D719Ae409A862D167CF512A632FfCA"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const connect = useMetamask();
  const address = useAddress();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaign = await contract.call("getCampaigns");

    const parsedCampaign = campaign.map((current, i) => ({
      owner: current.owner,
      title: current.title,
      description: current.desc,
      target: ethers.utils.formatEther(current.target.toString()),
      deadline: current.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(current.current.toString()),
      image: current.image,
      pId: i,
    }));

    const reparsed = parsedCampaign.filter((curr) => curr.pId !== 0);

    return reparsed;
  };

  const getUserCampaigns = async () => {
    const campaign = await getCampaigns();
    const filtered = campaign.filter((camp) => camp.owner == address);
    return filtered;
  };

  const donate = async (pId, amt) => {
    try {
      const data = await contract.call("donateCampaign", [pId], {
        value: ethers.utils.parseEther(amt),
      });
      return data;
    } catch (error) {
      console.log("Could not donate to the project", error);
    }
  };

  const getDonations = async (pId) => {
    try {
      const data = await contract.call("getDonators", [pId]);
      const numberOfDonations = data[0].length;

      const parsedData = [];
      for (let i = 0; i < numberOfDonations; i++) {
        parsedData.push({
          donator: data[0][i],
          donation: ethers.utils.formatEther(data[1][i].toString()),
        });
      }

      return parsedData;
    } catch (error) {
      console.log("Could not fetch donators to the project", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
