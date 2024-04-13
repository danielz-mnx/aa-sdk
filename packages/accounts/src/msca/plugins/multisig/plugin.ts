import {
  getContract,
  encodeAbiParameters,
  encodeFunctionData,
  type Address,
  type GetContractReturnType,
  type Transport,
  type PublicClient,
  type Client,
  type EncodeFunctionDataParameters,
  type Chain,
  type Hex,
  type ReadContractReturnType,
} from "viem";
import {
  ChainNotFoundError,
  AccountNotFoundError,
  isSmartAccountClient,
  IncompatibleClientError,
  type SmartContractAccount,
  type GetAccountParameter,
  type SendUserOperationResult,
  type GetEntryPointFromAccount,
  type UserOperationOverridesParameter,
  type GetContextParameter,
} from "@alchemy/aa-core";
import { type Plugin } from "../types.js";
import { installPlugin as installPlugin_ } from "../../plugin-manager/installPlugin.js";
import { type FunctionReference } from "../../account-loupe/types.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC6900PluginGen: This file is auto-generated by plugingen
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ExecutionActions<
  TAccount extends SmartContractAccount | undefined =
    | SmartContractAccount
    | undefined,
  TContext extends Record<string, any> | undefined =
    | Record<string, any>
    | undefined,
  TEntryPointVersion extends GetEntryPointFromAccount<TAccount> = GetEntryPointFromAccount<TAccount>
> = {
  updateOwnership: (
    args: Pick<
      EncodeFunctionDataParameters<
        typeof MultisigPluginExecutionFunctionAbi,
        "updateOwnership"
      >,
      "args"
    > &
      UserOperationOverridesParameter<TEntryPointVersion> &
      GetAccountParameter<TAccount> &
      GetContextParameter<TContext>
  ) => Promise<SendUserOperationResult<TEntryPointVersion>>;
};

type InstallArgs = [{ type: "address[]" }, { type: "uint256" }];

export type InstallMultisigPluginParams = {
  args: Parameters<typeof encodeAbiParameters<InstallArgs>>[1];
  pluginAddress?: Address;
  dependencyOverrides?: FunctionReference[];
};

type ManagementActions<
  TAccount extends SmartContractAccount | undefined =
    | SmartContractAccount
    | undefined,
  TContext extends Record<string, any> | undefined =
    | Record<string, any>
    | undefined,
  TEntryPointVersion extends GetEntryPointFromAccount<TAccount> = GetEntryPointFromAccount<TAccount>
> = {
  installMultisigPlugin: (
    args: UserOperationOverridesParameter<TEntryPointVersion> &
      InstallMultisigPluginParams &
      GetAccountParameter<TAccount> &
      GetContextParameter<TContext>
  ) => Promise<SendUserOperationResult<TEntryPointVersion>>;
};

type ReadAndEncodeActions<
  TAccount extends SmartContractAccount | undefined =
    | SmartContractAccount
    | undefined
> = {
  encodeUpdateOwnership: (
    args: Pick<
      EncodeFunctionDataParameters<
        typeof MultisigPluginExecutionFunctionAbi,
        "updateOwnership"
      >,
      "args"
    >
  ) => Hex;

  encodeEip712Domain: (
    args: Pick<
      EncodeFunctionDataParameters<
        typeof MultisigPluginExecutionFunctionAbi,
        "eip712Domain"
      >,
      "args"
    >
  ) => Hex;

  readEip712Domain: (
    args: GetAccountParameter<TAccount>
  ) => Promise<
    ReadContractReturnType<
      typeof MultisigPluginExecutionFunctionAbi,
      "eip712Domain"
    >
  >;

  encodeIsValidSignature: (
    args: Pick<
      EncodeFunctionDataParameters<
        typeof MultisigPluginExecutionFunctionAbi,
        "isValidSignature"
      >,
      "args"
    >
  ) => Hex;

  readIsValidSignature: (
    args: Pick<
      EncodeFunctionDataParameters<
        typeof MultisigPluginExecutionFunctionAbi,
        "isValidSignature"
      >,
      "args"
    > &
      GetAccountParameter<TAccount>
  ) => Promise<
    ReadContractReturnType<
      typeof MultisigPluginExecutionFunctionAbi,
      "isValidSignature"
    >
  >;
};

export type MultisigPluginActions<
  TAccount extends SmartContractAccount | undefined =
    | SmartContractAccount
    | undefined,
  TContext extends Record<string, any> | undefined =
    | Record<string, any>
    | undefined
> = ExecutionActions<TAccount, TContext> &
  ManagementActions<TAccount, TContext> &
  ReadAndEncodeActions<TAccount>;

const addresses = {
  11155111: "0x0b135A12EB2f7b441DCcE5F7DE07DB65AE7c4649" as Address,
} as Record<number, Address>;

export const MultisigPlugin: Plugin<typeof MultisigPluginAbi> = {
  meta: {
    name: "Multisig Plugin",
    version: "1.0.0",
    addresses,
  },
  getContract: <C extends Client>(
    client: C,
    address?: Address
  ): GetContractReturnType<typeof MultisigPluginAbi, PublicClient, Address> => {
    if (!client.chain) throw new ChainNotFoundError();

    return getContract({
      address: address || addresses[client.chain.id],
      abi: MultisigPluginAbi,
      client: client,
    });
  },
};

export const multisigPluginActions: <
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends SmartContractAccount | undefined =
    | SmartContractAccount
    | undefined,
  TContext extends Record<string, any> | undefined =
    | Record<string, any>
    | undefined
>(
  client: Client<TTransport, TChain, TAccount>
) => MultisigPluginActions<TAccount, TContext> = (client) => ({
  updateOwnership({ args, overrides, context, account = client.account }) {
    if (!account) {
      throw new AccountNotFoundError();
    }
    if (!isSmartAccountClient(client)) {
      throw new IncompatibleClientError(
        "SmartAccountClient",
        "updateOwnership",
        client
      );
    }

    const uo = encodeFunctionData({
      abi: MultisigPluginExecutionFunctionAbi,
      functionName: "updateOwnership",
      args,
    });

    return client.sendUserOperation({ uo, overrides, account, context });
  },
  installMultisigPlugin({
    account = client.account,
    overrides,
    context,
    ...params
  }) {
    if (!account) {
      throw new AccountNotFoundError();
    }

    if (!isSmartAccountClient(client)) {
      throw new IncompatibleClientError(
        "SmartAccountClient",
        "installMultisigPlugin",
        client
      );
    }

    const chain = client.chain;
    if (!chain) {
      throw new ChainNotFoundError();
    }

    const dependencies = params.dependencyOverrides ?? [];
    const pluginAddress =
      params.pluginAddress ??
      (MultisigPlugin.meta.addresses[chain.id] as Address | undefined);

    if (!pluginAddress) {
      throw new Error("missing MultisigPlugin address for chain " + chain.name);
    }

    return installPlugin_(client, {
      pluginAddress,
      pluginInitData: encodeAbiParameters(
        [{ type: "address[]" }, { type: "uint256" }],
        params.args
      ),
      dependencies,
      overrides,
      account,
      context,
    });
  },
  encodeUpdateOwnership({ args }) {
    return encodeFunctionData({
      abi: MultisigPluginExecutionFunctionAbi,
      functionName: "updateOwnership",
      args,
    });
  },
  encodeEip712Domain() {
    return encodeFunctionData({
      abi: MultisigPluginExecutionFunctionAbi,
      functionName: "eip712Domain",
    });
  },

  async readEip712Domain({ account = client.account }) {
    if (!account) {
      throw new AccountNotFoundError();
    }

    if (!isSmartAccountClient(client)) {
      throw new IncompatibleClientError(
        "SmartAccountClient",
        "readEip712Domain",
        client
      );
    }

    return client.readContract({
      address: account.address,
      abi: MultisigPluginExecutionFunctionAbi,
      functionName: "eip712Domain",
    });
  },
  encodeIsValidSignature({ args }) {
    return encodeFunctionData({
      abi: MultisigPluginExecutionFunctionAbi,
      functionName: "isValidSignature",
      args,
    });
  },

  async readIsValidSignature({ args, account = client.account }) {
    if (!account) {
      throw new AccountNotFoundError();
    }

    if (!isSmartAccountClient(client)) {
      throw new IncompatibleClientError(
        "SmartAccountClient",
        "readIsValidSignature",
        client
      );
    }

    return client.readContract({
      address: account.address,
      abi: MultisigPluginExecutionFunctionAbi,
      functionName: "isValidSignature",
      args,
    });
  },
});

export const MultisigPluginExecutionFunctionAbi = [
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "ownersToAdd", internalType: "address[]", type: "address[]" },
      { name: "ownersToRemove", internalType: "address[]", type: "address[]" },
      { name: "newThreshold", internalType: "uint128", type: "uint128" },
    ],
    name: "updateOwnership",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", internalType: "bytes1", type: "bytes1" },
      { name: "name", internalType: "string", type: "string" },
      { name: "version", internalType: "string", type: "string" },
      { name: "chainId", internalType: "uint256", type: "uint256" },
      { name: "verifyingContract", internalType: "address", type: "address" },
      { name: "salt", internalType: "bytes32", type: "bytes32" },
      { name: "extensions", internalType: "uint256[]", type: "uint256[]" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "digest", internalType: "bytes32", type: "bytes32" },
      { name: "signature", internalType: "bytes", type: "bytes" },
    ],
    name: "isValidSignature",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
] as const;

export const MultisigPluginAbi = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "entryPoint", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "ENTRYPOINT",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "actualDigest", internalType: "bytes32", type: "bytes32" },
      { name: "upperLimitGasDigest", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
      { name: "signatures", internalType: "bytes", type: "bytes" },
    ],
    name: "checkNSignatures",
    outputs: [
      { name: "failed", internalType: "bool", type: "bool" },
      { name: "firstFailure", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", internalType: "bytes1", type: "bytes1" },
      { name: "name", internalType: "string", type: "string" },
      { name: "version", internalType: "string", type: "string" },
      { name: "chainId", internalType: "uint256", type: "uint256" },
      { name: "verifyingContract", internalType: "address", type: "address" },
      { name: "salt", internalType: "bytes32", type: "bytes32" },
      { name: "extensions", internalType: "uint256[]", type: "uint256[]" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "message", internalType: "bytes", type: "bytes" },
    ],
    name: "encodeMessageData",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "message", internalType: "bytes", type: "bytes" },
    ],
    name: "getMessageHash",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "ownerToCheck", internalType: "address", type: "address" },
    ],
    name: "isOwnerOf",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "digest", internalType: "bytes32", type: "bytes32" },
      { name: "signature", internalType: "bytes", type: "bytes" },
    ],
    name: "isValidSignature",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "onInstall",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "", internalType: "bytes", type: "bytes" }],
    name: "onUninstall",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "ownershipInfoOf",
    outputs: [
      { name: "", internalType: "address[]", type: "address[]" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "pluginManifest",
    outputs: [
      {
        name: "",
        internalType: "struct PluginManifest",
        type: "tuple",
        components: [
          { name: "interfaceIds", internalType: "bytes4[]", type: "bytes4[]" },
          {
            name: "dependencyInterfaceIds",
            internalType: "bytes4[]",
            type: "bytes4[]",
          },
          {
            name: "executionFunctions",
            internalType: "bytes4[]",
            type: "bytes4[]",
          },
          {
            name: "permittedExecutionSelectors",
            internalType: "bytes4[]",
            type: "bytes4[]",
          },
          {
            name: "permitAnyExternalAddress",
            internalType: "bool",
            type: "bool",
          },
          { name: "canSpendNativeToken", internalType: "bool", type: "bool" },
          {
            name: "permittedExternalCalls",
            internalType: "struct ManifestExternalCallPermission[]",
            type: "tuple[]",
            components: [
              {
                name: "externalAddress",
                internalType: "address",
                type: "address",
              },
              { name: "permitAnySelector", internalType: "bool", type: "bool" },
              { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
            ],
          },
          {
            name: "userOpValidationFunctions",
            internalType: "struct ManifestAssociatedFunction[]",
            type: "tuple[]",
            components: [
              {
                name: "executionSelector",
                internalType: "bytes4",
                type: "bytes4",
              },
              {
                name: "associatedFunction",
                internalType: "struct ManifestFunction",
                type: "tuple",
                components: [
                  {
                    name: "functionType",
                    internalType: "enum ManifestAssociatedFunctionType",
                    type: "uint8",
                  },
                  { name: "functionId", internalType: "uint8", type: "uint8" },
                  {
                    name: "dependencyIndex",
                    internalType: "uint256",
                    type: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "runtimeValidationFunctions",
            internalType: "struct ManifestAssociatedFunction[]",
            type: "tuple[]",
            components: [
              {
                name: "executionSelector",
                internalType: "bytes4",
                type: "bytes4",
              },
              {
                name: "associatedFunction",
                internalType: "struct ManifestFunction",
                type: "tuple",
                components: [
                  {
                    name: "functionType",
                    internalType: "enum ManifestAssociatedFunctionType",
                    type: "uint8",
                  },
                  { name: "functionId", internalType: "uint8", type: "uint8" },
                  {
                    name: "dependencyIndex",
                    internalType: "uint256",
                    type: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "preUserOpValidationHooks",
            internalType: "struct ManifestAssociatedFunction[]",
            type: "tuple[]",
            components: [
              {
                name: "executionSelector",
                internalType: "bytes4",
                type: "bytes4",
              },
              {
                name: "associatedFunction",
                internalType: "struct ManifestFunction",
                type: "tuple",
                components: [
                  {
                    name: "functionType",
                    internalType: "enum ManifestAssociatedFunctionType",
                    type: "uint8",
                  },
                  { name: "functionId", internalType: "uint8", type: "uint8" },
                  {
                    name: "dependencyIndex",
                    internalType: "uint256",
                    type: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "preRuntimeValidationHooks",
            internalType: "struct ManifestAssociatedFunction[]",
            type: "tuple[]",
            components: [
              {
                name: "executionSelector",
                internalType: "bytes4",
                type: "bytes4",
              },
              {
                name: "associatedFunction",
                internalType: "struct ManifestFunction",
                type: "tuple",
                components: [
                  {
                    name: "functionType",
                    internalType: "enum ManifestAssociatedFunctionType",
                    type: "uint8",
                  },
                  { name: "functionId", internalType: "uint8", type: "uint8" },
                  {
                    name: "dependencyIndex",
                    internalType: "uint256",
                    type: "uint256",
                  },
                ],
              },
            ],
          },
          {
            name: "executionHooks",
            internalType: "struct ManifestExecutionHook[]",
            type: "tuple[]",
            components: [
              {
                name: "executionSelector",
                internalType: "bytes4",
                type: "bytes4",
              },
              {
                name: "preExecHook",
                internalType: "struct ManifestFunction",
                type: "tuple",
                components: [
                  {
                    name: "functionType",
                    internalType: "enum ManifestAssociatedFunctionType",
                    type: "uint8",
                  },
                  { name: "functionId", internalType: "uint8", type: "uint8" },
                  {
                    name: "dependencyIndex",
                    internalType: "uint256",
                    type: "uint256",
                  },
                ],
              },
              {
                name: "postExecHook",
                internalType: "struct ManifestFunction",
                type: "tuple",
                components: [
                  {
                    name: "functionType",
                    internalType: "enum ManifestAssociatedFunctionType",
                    type: "uint8",
                  },
                  { name: "functionId", internalType: "uint8", type: "uint8" },
                  {
                    name: "dependencyIndex",
                    internalType: "uint256",
                    type: "uint256",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "pluginMetadata",
    outputs: [
      {
        name: "",
        internalType: "struct PluginMetadata",
        type: "tuple",
        components: [
          { name: "name", internalType: "string", type: "string" },
          { name: "version", internalType: "string", type: "string" },
          { name: "author", internalType: "string", type: "string" },
          {
            name: "permissionDescriptors",
            internalType: "struct SelectorPermission[]",
            type: "tuple[]",
            components: [
              {
                name: "functionSelector",
                internalType: "bytes4",
                type: "bytes4",
              },
              {
                name: "permissionDescription",
                internalType: "string",
                type: "string",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "functionId", internalType: "uint8", type: "uint8" },
      { name: "preExecHookData", internalType: "bytes", type: "bytes" },
    ],
    name: "postExecutionHook",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "functionId", internalType: "uint8", type: "uint8" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "preExecutionHook",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "functionId", internalType: "uint8", type: "uint8" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "preRuntimeValidationHook",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "functionId", internalType: "uint8", type: "uint8" },
      {
        name: "userOp",
        internalType: "struct UserOperation",
        type: "tuple",
        components: [
          { name: "sender", internalType: "address", type: "address" },
          { name: "nonce", internalType: "uint256", type: "uint256" },
          { name: "initCode", internalType: "bytes", type: "bytes" },
          { name: "callData", internalType: "bytes", type: "bytes" },
          { name: "callGasLimit", internalType: "uint256", type: "uint256" },
          {
            name: "verificationGasLimit",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "preVerificationGas",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "maxFeePerGas", internalType: "uint256", type: "uint256" },
          {
            name: "maxPriorityFeePerGas",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "paymasterAndData", internalType: "bytes", type: "bytes" },
          { name: "signature", internalType: "bytes", type: "bytes" },
        ],
      },
      { name: "userOpHash", internalType: "bytes32", type: "bytes32" },
    ],
    name: "preUserOpValidationHook",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "functionId", internalType: "uint8", type: "uint8" },
      { name: "sender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "runtimeValidationFunction",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "ownersToAdd", internalType: "address[]", type: "address[]" },
      { name: "ownersToRemove", internalType: "address[]", type: "address[]" },
      { name: "newThreshold", internalType: "uint128", type: "uint128" },
    ],
    name: "updateOwnership",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "functionId", internalType: "uint8", type: "uint8" },
      {
        name: "userOp",
        internalType: "struct UserOperation",
        type: "tuple",
        components: [
          { name: "sender", internalType: "address", type: "address" },
          { name: "nonce", internalType: "uint256", type: "uint256" },
          { name: "initCode", internalType: "bytes", type: "bytes" },
          { name: "callData", internalType: "bytes", type: "bytes" },
          { name: "callGasLimit", internalType: "uint256", type: "uint256" },
          {
            name: "verificationGasLimit",
            internalType: "uint256",
            type: "uint256",
          },
          {
            name: "preVerificationGas",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "maxFeePerGas", internalType: "uint256", type: "uint256" },
          {
            name: "maxPriorityFeePerGas",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "paymasterAndData", internalType: "bytes", type: "bytes" },
          { name: "signature", internalType: "bytes", type: "bytes" },
        ],
      },
      { name: "userOpHash", internalType: "bytes32", type: "bytes32" },
    ],
    name: "userOpValidationFunction",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "addedOwners",
        internalType: "address[]",
        type: "address[]",
        indexed: false,
      },
      {
        name: "removedOwners",
        internalType: "address[]",
        type: "address[]",
        indexed: false,
      },
      {
        name: "threshold",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "OwnerUpdated",
  },
  { type: "error", inputs: [], name: "AlreadyInitialized" },
  { type: "error", inputs: [], name: "ECDSARecoverFailure" },
  { type: "error", inputs: [], name: "EmptyOwnersNotAllowed" },
  { type: "error", inputs: [], name: "InvalidAction" },
  { type: "error", inputs: [], name: "InvalidGasValues" },
  { type: "error", inputs: [], name: "InvalidMaxFeePerGas" },
  { type: "error", inputs: [], name: "InvalidMaxPriorityFeePerGas" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "InvalidOwner",
  },
  { type: "error", inputs: [], name: "InvalidPreVerificationGas" },
  { type: "error", inputs: [], name: "InvalidSigLength" },
  { type: "error", inputs: [], name: "InvalidSigOffset" },
  { type: "error", inputs: [], name: "InvalidThreshold" },
  {
    type: "error",
    inputs: [{ name: "caller", internalType: "address", type: "address" }],
    name: "NotContractCaller",
  },
  {
    type: "error",
    inputs: [
      { name: "selector", internalType: "bytes4", type: "bytes4" },
      { name: "functionId", internalType: "uint8", type: "uint8" },
    ],
    name: "NotImplemented",
  },
  { type: "error", inputs: [], name: "NotInitialized" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnerDoesNotExist",
  },
] as const;
