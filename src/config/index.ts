import { defaultWagmiConfig } from '@web3modal/wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'

export const projectId = process.env['NEXT_PUBLIC_PROJECT_ID']

export const domain = process.env['NEXT_PUBLIC_APP_DOMAIN'] ?? ""

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const config = defaultWagmiConfig({
  projectId,
  chains: [bscTestnet, bsc],
  metadata: {
    name: 'Athene Vault',
    description: 'Athene Vault',
    url: `https://${domain}`,
    icons: [`https://${domain}/favicon.ico`]
  },
})

export const targetChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID)
export const includeTestnet = (process.env.NEXT_PUBLIC_INCLUDE_TESTNET ?? 'false') === 'true'