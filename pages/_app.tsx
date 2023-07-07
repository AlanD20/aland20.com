import '../styles/globals.css';
import store from '@/config/store';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Layout from '@comp/layout/Layout';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
