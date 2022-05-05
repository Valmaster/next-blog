// Librairie
import { connectToDatabase } from '../../helpers/mongodb';

export default async function handler(req, res) {
	if (req.method == 'POST') {
		const { title, description, slug } =
			req.body;

		// Vérifier que tous les champs soient remplis
		if (
			!title ||
			!description ||
			!slug
		) {
			return res.status(422).json({
				message: 'Champ du formulaire manquant.',
			});
		}

		// Stocker le nouveau article
		const newArticle = {
			title,
			description,
			slug,
			created_at: new Date(),
			updated_at: new Date(),
		};

		// Connexion à MongoDB
		let clientMongoDB;
		try {
			clientMongoDB = await connectToDatabase();
		} catch (error) {
			return res.status(500).json({
				message: "Impossible d'effectuer la requête.",
			});
		}

		const db = clientMongoDB.db();

		// Insérer un nouvel article
		try {
			await db.collection('articles').insertOne(newArticle);
		} catch (error) {
			clientMongoDB.close();
			return res.status(500).json({
				message: 'Un problème est survenu.',
			});
		}

		// Succès
		clientMongoDB.close();
		return res.status(201).json({
			message: 'Article ajouté avec succès.',
			article: newArticle,
		});
	}
	return res.status(405).json({
		message: 'Une erreur est survenue.',
	});
}
