import { Hex, parseUnits } from 'viem';

export const defiLamaModuleName = `Find best swap route`;
export const cowSwapModuleName = `Swap ETH to USDT via CowSwap`;
export const inchSwapModuleName = `Swap ETH to USDT via 1Inch`;
export const paraSwapModuleName = `Swap ETH to USDT via ParaSwap`;

export const wETHContractAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
export const eeContractAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const pools = ['29142561823926831674322526702366392616263391169738682'];

export const uniswapV2ForkedContractAddress = '0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57';

export const usdtContractAddress: Hex = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

export const partner: string = 'LlamaSwap';
export const excludedDEXS: string[] = ['ParaSwapPool', 'ParaSwapLimitOrders'];

export const defiLamaKey = 'nsr_UYWxuvj1hOCgHxJhDEKZ0g30c4Be3I5fOMBtFAA';

export const mcap = 9007199254740991;

export const appData = '0xf249b3db926aa5b5a1b18f3fec86b9cc99b9a8a99ad7e8034242d2838ae97422';

export const cowContractAddress = '0x40A50cf069e992AA4536211B23F286eF88752187';

export const cowSwapSlippage = 0.02;

export const minCowSwapValue = parseUnits('5', 14);
