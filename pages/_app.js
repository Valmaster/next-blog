// Librairie
import '../styles/default.css';
import Head from 'next/head';

// Composant
import Layout from '../components/ui/Layout/Layout';
import {SessionProvider} from "next-auth/react"

function MyApp({
                   Component,
                   pageProps: {session, ...pageProps},
               }) {
    return (
        <SessionProvider session={session} refetchInterval={5 * 60}>
            <Layout>
                <Head>
                    <title>Blog</title>
                </Head>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}

export default MyApp;
