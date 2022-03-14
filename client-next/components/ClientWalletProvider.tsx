import { WalletProvider } from '@solana/wallet-adapter-react'
import {
    // getLedgerWallet,
    // getMathWallet,
    getPhantomWallet,
    // getSolflareWallet,
    // getSolletWallet,
    // getSolongWallet,
} from '@solana/wallet-adapter-wallets'
import { useMemo } from 'react'

export default function(
    props: any
) {
    const wallets = useMemo(
        () => [
            getPhantomWallet(),
            // getSolflareWallet(),
            // getLedgerWallet(),
            // getSolongWallet(),
            // getMathWallet(),
            // getSolletWallet(),
        ],
        []
    )

    return <WalletProvider wallets={wallets} {...props} />
}