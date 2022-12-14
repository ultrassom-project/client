import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/create-emotion-cache';
import lightThemeOptions from '../styles/themes/light-theme-options';
import '../styles/globals.css';
import Head from 'next/head';
import AppProvider from '../hooks';

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FC<MyAppProps> = (props) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={lightTheme}>
                <AppProvider>
                    <Head>
                        <title>Client</title>
                        <meta name="description" content="Client" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <CssBaseline />
                    <Component {...pageProps} />
                </AppProvider>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;
