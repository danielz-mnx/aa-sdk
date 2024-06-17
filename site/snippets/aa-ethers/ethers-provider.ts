import {
  createSimpleSmartAccount,
  getChain,
  getDefaultSimpleAccountFactoryAddress,
} from "@aa-sdk/core";
import { EthersProviderAdapter } from "@aa-sdk/ethers";
import { Alchemy, Network } from "alchemy-sdk";
import { http } from "viem";
import { signer } from "../aa-core/lightAccountClient";

// 1. Create alchemy instance
const alchemy = new Alchemy({
  apiKey: process.env.API_KEY!,
  network: Network.MATIC_MUMBAI,
});
const ethersProvider = await alchemy.config.getProvider();

const chain = getChain(ethersProvider.network.chainId);

// 2. smart account client from alchemy's ethers provider and connect with simple smart account
export const provider = EthersProviderAdapter.fromEthersProvider(
  ethersProvider
).connectToAccount(
  await createSimpleSmartAccount({
    chain,
    signer,
    factoryAddress: getDefaultSimpleAccountFactoryAddress(chain),
    transport: http(
      `${chain.rpcUrls.alchemy.http[0]}/${ethersProvider.apiKey}`
    ),
  })
);
