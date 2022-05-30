import { ApolloProvider } from '@apollo/client';
import styled from '@emotion/styled';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import client from '../lib/apollo';

const Wrapper = styled.div`
  font-family: Comfortaa, Arial, sans-serif;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </Wrapper>
    </ApolloProvider>
  );
}

export default MyApp;
