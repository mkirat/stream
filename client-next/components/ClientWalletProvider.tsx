import { WalletProvider } from '@solana/wallet-adapter-react'
import {
    getPhantomWallet,
} from '@solana/wallet-adapter-wallets'
import { useMemo } from 'react'

const ClientWalletProvider = (
    props: any
) => {
    const wallets = useMemo(
        () => [
            getPhantomWallet(),
        ],
        []
    )

    return <WalletProvider wallets={wallets} {...props} />
}

export default ClientWalletProvider;