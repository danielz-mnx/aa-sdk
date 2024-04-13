import type {
  GetAccountParameter,
  GetEntryPointFromAccount,
  SmartContractAccount,
  UserOperationRequest,
} from "@alchemy/aa-core";
import type { Hex } from "viem";
import type { GetPluginAddressParameter } from "../types";

export type SignerType = "EOA" | "CONTRACT";

export type UserOpSignatureType = "ACTUAL" | "UPPERLIMIT";

export type Signature = {
  signerType: SignerType;
  userOpSigType: UserOpSignatureType;
  signer: `0x${string}`;
  signature: `0x${string}`;
};

export type SignMultisigUserOperationResult = {
  signature: Hex;
  aggregatedSignature: Hex;
  signatureObj: Signature;
};

export type SignMultisigUserOperationParams<
  TAccount extends SmartContractAccount | undefined =
    | SmartContractAccount
    | undefined,
  TEntryPointVersion extends GetEntryPointFromAccount<TAccount> = GetEntryPointFromAccount<TAccount>
> = {
  userOperationRequest: UserOperationRequest<TEntryPointVersion>;
  signatures: Signature[];
} & GetAccountParameter<TAccount> &
  GetPluginAddressParameter;

export type ProposeUserOperationResult<
  TAccount extends SmartContractAccount | undefined =
    | SmartContractAccount
    | undefined,
  TEntryPointVersion extends GetEntryPointFromAccount<TAccount> = GetEntryPointFromAccount<TAccount>
> = {
  request: UserOperationRequest<TEntryPointVersion>;
  aggregatedSignature: Hex;
  signatureObj: Signature;
};

export type MultisigUserOperationContext = {
  signature: Hex;
};
