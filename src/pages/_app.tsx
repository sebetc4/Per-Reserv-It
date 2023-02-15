import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { Layout } from '../apps/front/components';
import { ThemeProvider } from '../apps/front/providers';
import { checkAuth, wrapper } from '../store';

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const state = store.getState();

    // Check Auth
    useEffect(() => {
        const {} = store.dispatch(checkAuth());
    }, [store]);

    return (
        <Provider store={store}>
            <Head>
                <meta
                    name='viewport'
                    content='initial-scale=1, width=device-width'
                />
            </Head>
            <ThemeProvider>
                <Layout>
                    <Component {...props.pageProps} />
                </Layout>
            </ThemeProvider>
        </Provider>
    );
}
