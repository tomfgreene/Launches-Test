import '@/styles/globals.css'
import { useState } from 'react'
import { MantineThemeOverride, MantineProvider} from '@mantine/core'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import type { AppProps } from 'next/app'

//--Root app which contains tanstack client object and mantine provider wrapping
export default function App({ Component, pageProps }: AppProps) {

  //-- Creates new tanstack client object
  const [queryClient] = useState(() => new QueryClient())

  //-- Global mantine theme configuration
  const appTheme: MantineThemeOverride = {
    colorScheme: 'dark',
    datesLocale: 'en-gb',
    fontFamily: 'D-DIN-Medium,Arial,Verdana,sans-serif',
    activeStyles: {
      active: '#173753'
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={appTheme}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
