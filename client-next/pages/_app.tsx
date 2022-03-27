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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Container} from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import {color} from "@mui/system";

import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import { MetaMaskProvider } from '../components/eth/useMetamask'


const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#e42776",
    },
  },
});

const BackgroundContainer = styled(Container)(({ theme }) => ({
  color: "white",
  background: theme.palette.primary.main,
}));


function getLibrary(provider, connector) {
  return new Web3(provider)
}

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
  }, [router]);

  return <ConnectionProvider endpoint={endpoint}>
    <WalletProvider>
      <WalletModalProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <MetaMaskProvider>
            <ThemeProvider theme={theme}>
              <div>{router.pathname.includes("/advertisment") ? <Component {...pageProps} />:<> <Appbar />
                {/*
                    // @ts-ignore */}
                <BackgroundContainer maxWidth={"100vw"}>
                <Component {...pageProps} />
                </BackgroundContainer></>}</div>
            </ThemeProvider>
        </MetaMaskProvider>
      </Web3ReactProvider>
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
}

export default MyApp
