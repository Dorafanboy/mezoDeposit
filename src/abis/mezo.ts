﻿export const mezoABI = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'target',
                type: 'address',
            },
        ],
        name: 'AddressEmptyCode',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'AddressInsufficientBalance',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'unlockAt',
                type: 'uint32',
            },
        ],
        name: 'DepositLocked',
        type: 'error',
    },
    {
        inputs: [],
        name: 'DepositNotFound',
        type: 'error',
    },
    {
        inputs: [],
        name: 'FailedInnerCall',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'IncorrectAmount',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'depositor',
                type: 'address',
            },
        ],
        name: 'IncorrectDepositor',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'lockPeriod',
                type: 'uint256',
            },
        ],
        name: 'IncorrectLockPeriod',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'enum Portal.TokenAbility',
                name: 'ability',
                type: 'uint8',
            },
        ],
        name: 'IncorrectTokenAbility',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'IncorrectTokenAddress',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'depositBalance',
                type: 'uint256',
            },
        ],
        name: 'InsufficientDepositAmount',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'enum Portal.TokenAbility',
                name: 'tokenAbility',
                type: 'uint8',
            },
        ],
        name: 'InsufficientTokenAbility',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidInitialization',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'lockPeriod',
                type: 'uint32',
            },
        ],
        name: 'LockPeriodOutOfRange',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: 'lockPeriod',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: 'newUnlockAt',
                type: 'uint32',
            },
            {
                internalType: 'uint32',
                name: 'existingUnlockAt',
                type: 'uint32',
            },
        ],
        name: 'LockPeriodTooShort',
        type: 'error',
    },
    {
        inputs: [],
        name: 'NotInitializing',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'OwnableInvalidOwner',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'OwnableUnauthorizedAccount',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'SafeERC20FailedOperation',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'enum Portal.TokenAbility',
                name: 'tokenAbility',
                type: 'uint8',
            },
        ],
        name: 'TokenAlreadySupported',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'TokenNotSupported',
        type: 'error',
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !0,
                internalType: 'address',
                name: 'depositor',
                type: 'address',
            },
            {
                indexed: !0,
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                indexed: !0,
                internalType: 'uint256',
                name: 'depositId',
                type: 'uint256',
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'Deposited',
        type: 'event',
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !1,
                internalType: 'uint64',
                name: 'version',
                type: 'uint64',
            },
        ],
        name: 'Initialized',
        type: 'event',
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !0,
                internalType: 'address',
                name: 'depositor',
                type: 'address',
            },
            {
                indexed: !0,
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                indexed: !0,
                internalType: 'uint256',
                name: 'depositId',
                type: 'uint256',
            },
            {
                indexed: !1,
                internalType: 'uint32',
                name: 'unlockAt',
                type: 'uint32',
            },
            {
                indexed: !1,
                internalType: 'uint32',
                name: 'lockPeriod',
                type: 'uint32',
            },
        ],
        name: 'Locked',
        type: 'event',
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !1,
                internalType: 'uint32',
                name: 'maxLockPeriod',
                type: 'uint32',
            },
        ],
        name: 'MaxLockPeriodUpdated',
        type: 'event',
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !1,
                internalType: 'uint32',
                name: 'minLockPeriod',
                type: 'uint32',
            },
        ],
        name: 'MinLockPeriodUpdated',
        type: 'event',
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !0,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: !0,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferStarted',
        type: 'event',
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !0,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: !0,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !0,
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                indexed: !1,
                internalType: 'enum Portal.TokenAbility',
                name: 'tokenAbility',
                type: 'uint8',
            },
        ],
        name: 'SupportedTokenAdded',
        type: 'event',
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !0,
                internalType: 'address',
                name: 'depositor',
                type: 'address',
            },
            {
                indexed: !0,
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                indexed: !0,
                internalType: 'uint256',
                name: 'depositId',
                type: 'uint256',
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'Withdrawn',
        type: 'event',
    },
    {
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'token',
                        type: 'address',
                    },
                    {
                        internalType: 'enum Portal.TokenAbility',
                        name: 'tokenAbility',
                        type: 'uint8',
                    },
                ],
                internalType: 'struct Portal.SupportedToken',
                name: 'supportedToken',
                type: 'tuple',
            },
        ],
        name: 'addSupportedToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint96',
                name: 'amount',
                type: 'uint96',
            },
            {
                internalType: 'uint32',
                name: 'lockPeriod',
                type: 'uint32',
            },
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'depositCount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'depositOwner',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint96',
                name: 'amount',
                type: 'uint96',
            },
            {
                internalType: 'uint32',
                name: 'lockPeriod',
                type: 'uint32',
            },
        ],
        name: 'depositFor',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'deposits',
        outputs: [
            {
                internalType: 'uint96',
                name: 'balance',
                type: 'uint96',
            },
            {
                internalType: 'uint32',
                name: 'unlockAt',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'depositor',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'depositId',
                type: 'uint256',
            },
        ],
        name: 'getDeposit',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint96',
                        name: 'balance',
                        type: 'uint96',
                    },
                    {
                        internalType: 'uint32',
                        name: 'unlockAt',
                        type: 'uint32',
                    },
                ],
                internalType: 'struct Portal.DepositInfo',
                name: '',
                type: 'tuple',
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
                        internalType: 'address',
                        name: 'token',
                        type: 'address',
                    },
                    {
                        internalType: 'enum Portal.TokenAbility',
                        name: 'tokenAbility',
                        type: 'uint8',
                    },
                ],
                internalType: 'struct Portal.SupportedToken[]',
                name: 'supportedTokens',
                type: 'tuple[]',
            },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'depositId',
                type: 'uint256',
            },
            {
                internalType: 'uint32',
                name: 'lockPeriod',
                type: 'uint32',
            },
        ],
        name: 'lock',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'maxLockPeriod',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'minLockPeriod',
        outputs: [
            {
                internalType: 'uint32',
                name: '',
                type: 'uint32',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'pendingOwner',
        outputs: [
            {
                internalType: 'address',
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
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
            },
        ],
        name: 'receiveApproval',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: '_maxLockPeriod',
                type: 'uint32',
            },
        ],
        name: 'setMaxLockPeriod',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint32',
                name: '_minLockPeriod',
                type: 'uint32',
            },
        ],
        name: 'setMinLockPeriod',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'tokenAbility',
        outputs: [
            {
                internalType: 'enum Portal.TokenAbility',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'depositId',
                type: 'uint256',
            },
            {
                internalType: 'uint96',
                name: 'amount',
                type: 'uint96',
            },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
