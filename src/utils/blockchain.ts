import BigNumber from 'bignumber.js';

function convertUnitToAmount(amount: string, decimals: number): string {
  return new BigNumber(amount).div(new BigNumber(10).pow(decimals)).toFixed();
}

export { convertUnitToAmount };
