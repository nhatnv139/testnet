export const getReceiptTranstion = async (provider: any, hash: string) => {
  try {
    if (provider) {
      let makeSureTxCompleted = await provider.getTransactionReceipt(hash);
      while (!makeSureTxCompleted) {
        makeSureTxCompleted = await provider.getTransactionReceipt(hash);
      }
    }
  } catch (error) {
    throw error;
  }
};

const optionsLocalString = {
  useGrouping: true,
  maximumFractionDigits: 3,
  minimumFractionDigits: 0,
  decimalSeparator: '.',
  groupingSeparator: ',',
};

export function formatNumber(
  unformatted: number | string | undefined,
  showDigits = 2,
) {
  // get fraction digits for small number
  if (!unformatted) return 0;
  const absNumber = Math.abs(Number(unformatted));
  if (absNumber > 0) {
    const digits = Math.ceil(Math.log10(1 / absNumber));
    if (digits < 3) {
      // optionsLocalString fix error decimalSeparator = ',' on mobile
      return Number(unformatted).toLocaleString('en-US', optionsLocalString);
    }
    return Number(unformatted).toFixed(digits + showDigits);
  } else {
    return 0;
  }
}

export const getTimeInfo = (timestamp: number) => {
  const time = new Date(timestamp)
  const data: any = {
    s: time.getSeconds(),
    m: time.getMinutes(),
    h: time.getHours(),
    d: time.getDate(),
    mm: time.getMonth() +1,
    y: time.getFullYear(),
  }

  const result: any = {};
  Object.keys(data).forEach((t: any) => {
    const value = data[t];
    result[t] = value < 10 ?`0${value}`: value
  })
  return result
}

export function shortenAddress(address: string, placeFirst = 4, placeSecond = 4): string {
  return `${address.substring(0, placeFirst + 2)}...${address.substring(address.length - placeSecond)}`;
}