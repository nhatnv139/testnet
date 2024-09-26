import {
    useAccount,
    useBalance,
    useReadContract,
  } from "wagmi";
  import { ERC20_ABI } from "@/config/smartcontract/abi";
import { formatUnits, zeroAddress } from "viem";

const zero = BigInt(0);

const useTokenBalance = (tokenAddress: any): {balance: bigint, balanceFormated: string, decimals: number, refetchBalance: Function}  => {
    const { address } = useAccount();

    // native
    const { data: nativeData, refetch: reFreshNative } = useBalance({address })

    // erc20 token
    const { data: tokenBalance, refetch } = useReadContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [address],
      query: {enabled: !!address}
    });

    const { data: tokenDecimal } = useReadContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "decimals",
      query: {enabled: !!address}
    });

    if (tokenAddress === zeroAddress) {
      return {
        balance: nativeData ? nativeData?.value: zero,
        balanceFormated: nativeData ? nativeData?.formatted: '0',
        decimals: nativeData ?nativeData.decimals: 0,
        refetchBalance: reFreshNative,
      }; 
    }

    return {
      balance: tokenBalance ? tokenBalance as bigint : zero,
      balanceFormated: tokenBalance ? formatUnits(tokenBalance as bigint ?? zero, tokenDecimal as number ?? zero): '0',
      decimals: tokenDecimal ? tokenDecimal as number : 0,
      refetchBalance: refetch,
    };
  };
  
  export default useTokenBalance;