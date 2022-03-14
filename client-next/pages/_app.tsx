import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
const WalletProvider = dynamic(() => import('../components/ClientWalletProvider'), {
  ssr: false,
})
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import {useEffect, useMemo} from "react";
import {network} from "../config";
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import '../public/nprogress.css'
import {Appbar} from "../components/Appbar";

function MyApp({ Component, pageProps }: AppProps) {
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  return <ConnectionProvider endpoint={endpoint}>
    <WalletProvider>
      <WalletModalProvider>
        <Appbar />
        <Component {...pageProps} />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
}

export default MyApp
