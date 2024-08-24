﻿export const cowSwapABI = [
    {
        inputs: [
            {
                internalType: 'contract ICoWSwapSettlement',
                name: '_cowSwapSettlement',
                type: 'address',
            },
            {
                internalType: 'contract IWrappedNativeToken',
                name: '_wrappedNativeToken',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'EthTransferFailed',
        type: 'error',
    },
    {
        inputs: [],
        name: 'IncorrectEthAmount',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'orderHash',
                type: 'bytes32',
            },
        ],
        name: 'NotAllowedToInvalidateOrder',
        type: 'error',
    },
    {
        inputs: [],
        name: 'NotAllowedZeroSellAmount',
        type: 'error',
    },
    {
        inputs: [],
        name: 'OrderIsAlreadyExpired',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'orderHash',
                type: 'bytes32',
            },
        ],
        name: 'OrderIsAlreadyOwned',
        type: 'error',
    },
    {
        inputs: [],
        name: 'ReceiverMustBeSet',
        type: 'error',
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !1,
                internalType: 'bytes',
                name: 'orderUid',
                type: 'bytes',
            },
        ],
        name: 'OrderInvalidation',
        type: 'event',
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !0,
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                components: [
                    {
                        internalType: 'contract IERC20',
                        name: 'sellToken',
                        type: 'address',
                    },
                    {
                        internalType: 'contract IERC20',
                        name: 'buyToken',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'receiver',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'sellAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'buyAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint32',
                        name: 'validTo',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bytes32',
                        name: 'appData',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'uint256',
                        name: 'feeAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes32',
                        name: 'kind',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'bool',
                        name: 'partiallyFillable',
                        type: 'bool',
                    },
                    {
                        internalType: 'bytes32',
                        name: 'sellTokenBalance',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'bytes32',
                        name: 'buyTokenBalance',
                        type: 'bytes32',
                    },
                ],
                indexed: !1,
                internalType: 'struct GPv2Order.Data',
                name: 'order',
                type: 'tuple',
            },
            {
                components: [
                    {
                        internalType: 'enum ICoWSwapOnchainOrders.OnchainSigningScheme',
                        name: 'scheme',
                        type: 'uint8',
                    },
                    {
                        internalType: 'bytes',
                        name: 'data',
                        type: 'bytes',
                    },
                ],
                indexed: !1,
                internalType: 'struct ICoWSwapOnchainOrders.OnchainSignature',
                name: 'signature',
                type: 'tuple',
            },
            {
                indexed: !1,
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
            },
        ],
        name: 'OrderPlacement',
        type: 'event',
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !1,
                internalType: 'bytes',
                name: 'orderUid',
                type: 'bytes',
            },
            {
                indexed: !0,
                internalType: 'address',
                name: 'refunder',
                type: 'address',
            },
        ],
        name: 'OrderRefund',
        type: 'event',
    },
    {
        inputs: [],
        name: 'cowSwapSettlement',
        outputs: [
            {
                internalType: 'contract ICoWSwapSettlement',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'contract IERC20',
                        name: 'buyToken',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'receiver',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'sellAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'buyAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes32',
                        name: 'appData',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'uint256',
                        name: 'feeAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint32',
                        name: 'validTo',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bool',
                        name: 'partiallyFillable',
                        type: 'bool',
                    },
                    {
                        internalType: 'int64',
                        name: 'quoteId',
                        type: 'int64',
                    },
                ],
                internalType: 'struct EthFlowOrder.Data',
                name: 'order',
                type: 'tuple',
            },
        ],
        name: 'createOrder',
        outputs: [
            {
                internalType: 'bytes32',
                name: 'orderHash',
                type: 'bytes32',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'contract IERC20',
                        name: 'buyToken',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'receiver',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'sellAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'buyAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes32',
                        name: 'appData',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'uint256',
                        name: 'feeAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint32',
                        name: 'validTo',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bool',
                        name: 'partiallyFillable',
                        type: 'bool',
                    },
                    {
                        internalType: 'int64',
                        name: 'quoteId',
                        type: 'int64',
                    },
                ],
                internalType: 'struct EthFlowOrder.Data',
                name: 'order',
                type: 'tuple',
            },
        ],
        name: 'invalidateOrder',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'contract IERC20',
                        name: 'buyToken',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'receiver',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'sellAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'buyAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bytes32',
                        name: 'appData',
                        type: 'bytes32',
                    },
                    {
                        internalType: 'uint256',
                        name: 'feeAmount',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint32',
                        name: 'validTo',
                        type: 'uint32',
                    },
                    {
                        internalType: 'bool',
                        name: 'partiallyFillable',
                        type: 'bool',
                    },
                    {
                        internalType: 'int64',
                        name: 'quoteId',
                        type: 'int64',
                    },
                ],
                internalType: 'struct EthFlowOrder.Data[]',
                name: 'orderArray',
                type: 'tuple[]',
            },
        ],
        name: 'invalidateOrdersIgnoringNotAllowed',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'orderHash',
                type: 'bytes32',
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        name: 'isValidSignature',
        outputs: [
            {
                internalType: 'bytes4',
                name: '',
                type: 'bytes4',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32',
            },
        ],
        name: 'orders',
        outputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'uint32',
                name: 'validTo',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'unwrap',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'wrap',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'wrapAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'wrappedNativeToken',
        outputs: [
            {
                internalType: 'contract IWrappedNativeToken',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        stateMutability: 'payable',
        type: 'receive',
    },
];
