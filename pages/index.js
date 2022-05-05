// Librairies
import Head from 'next/head';
import React from 'react';
import ArticleCard from "../components/ArticleCard/ArticleCard";

export default function Index() {

	return (
		<main>
			<Head>
				<title>Blog</title>
			</Head>
			<h1>Les derniers articles</h1>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: '10px',
				}}
			>
			</div>
		</main>
	);
}
