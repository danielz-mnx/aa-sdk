import type { Chain, Client, Hex, Transport } from "viem";
import type { BundlerRpcSchema } from "../../client/decorators/bundlerClient";
import type { EntryPointVersion } from "../../entrypoint/types";
import type { UserOperationResponse } from "../../types";

export const getUserOperationByHash = async <
  TClient extends Client<Transport, Chain | undefined, any, BundlerRpcSchema>
>(
  client: TClient,
  args: {
    hash: Hex;
  }
): Promise<UserOperationResponse<EntryPointVersion> | null> => {
  return client.request({
    method: "eth_getUserOperationByHash",
    params: [args.hash],
  });
};
