// Librairies
import Head from 'next/head';
import React from 'react';
import ArticleCard from "../components/ArticleCard/ArticleCard";
import {connectToDatabase} from "../helpers/mongodb";

export default function Index({articles}) {

	return (
		<main>
			<Head>
				<title>Blog</title>
			</Head>
			<h1>Les derniers articless</h1>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: '10px',
				}}
			>
				{articles.map((article) => (
					<ArticleCard article={article} key={article._id} />
				))}
			</div>
		</main>
	);
}


export async function getServerSideProps() {
	// Variables
	let articles = [];

	try {
		// Connexion à MongoDB
		const client = await connectToDatabase();
		const db = client.db();

		articles = await db
			.collection('articles')
			.find()
			.sort({ dateDePublication: -1 })
			.limit(3)
			.toArray();
	} catch (error) {
		console.log(error);
	}

	return {
		props: {
			articles: JSON.parse(JSON.stringify(articles)),
		},
	};
}

