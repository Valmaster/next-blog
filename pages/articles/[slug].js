import Head from 'next/head';
import {connectToDatabase} from "../../helpers/mongodb";
import React from "react";

export default function Article({article}) {

    return (
        <>
            <Head>
                <title>{article.title}</title>
            </Head>
            <h1 style={{ marginBottom: '.5rem' }}>{article.title}</h1>
            <small style={{ display: 'flex', gap: '15px' }}>
                <div>Projet réalisé en {article.created_at}.</div>
            </small>
        </>
    );
}


export async function getStaticPaths() {
    // Variable
    let articles;

    try {
        const client = await connectToDatabase();
        const db = client.db();

        // Récupére tous les projets
        articles = await db.collection('articles').find().toArray();
    } catch (error) {
        articles = [];
    }

    const dynamicPaths = articles.map((article) => ({
        params: {slug: article.slug},
    }));

    return {
        paths: dynamicPaths,
        fallback: 'blocking',
    };
}



export async function getStaticProps(context) {
    // Variables
    let articleSelected;
    let { params } = context;
    const slug = params.slug;

    try {
        const client = await connectToDatabase();
        const db = client.db();

// Récupérer le projet en cours
        articleSelected = await db
            .collection('articles')
            .find({ slug: slug })
            .toArray();
    } catch (error) {
        articleSelected = [];
    }

    if (!articleSelected[0]) {
        return {
            // notFound: true,
            redirect: {
                destination: '/',
            },
        };
    }

    return {
        props: {
            article: JSON.parse(JSON.stringify(articleSelected))[0],
        },
        revalidate: 3600,
    };
}


