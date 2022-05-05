import Head from 'next/head';
import React from "react";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import {connectToDatabase} from "../../helpers/mongodb";

export default function Articles({articles}) {
	return (
		<>
			<Head>
				<title>Mes articles</title>
			</Head>
			<h1>Mes articles</h1>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: '10px',
				}}
			>
				{articles.map((article) => (
					<ArticleCard article={article} key={article.id} />
				))}
			</div>
		</>
	);
}

export async function getStaticProps() {
	// Variables
	let articles = [];

	try {
		const client = await connectToDatabase();
		const db = client.db();

		// Récupérer les articles
		articles = await db
			.collection('articles')
			.find()
			.sort({ created_at: 'desc' })
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
