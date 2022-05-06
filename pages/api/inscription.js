// Librairies
import { connectToDatabase } from '../../helpers/mongodb';
import { hashPassword } from '../../helpers/auth';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { username, email } = req.body;
		let { password } = req.body;

		// 1ère étape : Vérifier que tous les champs soient remplis
		if (!username || !email || !password) {
			res.status(422).json({
				message: 'Champ du formulaire manquant.',
			});
			return;
		}

		// Etape intermédiaire indispensable : sécuriser le mot de passe
		password = await hashPassword(password);

		// 2ème étape : Stocker le nouvel utilisateur
		const newUser = {
			username,
			email,
			password,
			roles: ['utilisateur'],
		};

		// 3ème étape : Vérifier la syntaxe de l'email
		const pattern =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!pattern.test(email)) {
			res.status(406).json({
				message: 'Votre adresse email est invalide.',
			});
		}

		// Connexion à MongoDB
		let clientMongoDB;
		try {
			clientMongoDB = await connectToDatabase();
		} catch (error) {
			res.status(500).json({
				message: "Impossible d'effectuer la requête.",
			});
			return;
		}

		const db = clientMongoDB.db();
		let emailAlreadyUsed;

		// 4ème étape : Vérifier que l'adresse email n'est pas utilisée
		try {
			emailAlreadyUsed = await db
				.collection('users')
				.findOne({ email: email });
		} catch (error) {
			clientMongoDB.close();
			res.status(500).json({
				message: 'Un problème est survenu.',
			});
			return;
		}

		if (emailAlreadyUsed) {
			clientMongoDB.close();
			res.status(403).json({
				message: 'Cette adresse email est déjà utilisée.',
			});
			return;
		}

		// 5ème étape : Insérer un nouvel utilisateur
		try {
			await db
				.collection('users')
				.insertOne(nouvelUtilisateur);
		} catch (error) {
			clientMongoDB.close();
			res.status(500).json({
				message: 'Un problème est survenu.',
			});
			return;
		}

		// Succès
		clientMongoDB.close();
		res.status(201).json({
			message: 'Utilisateur enregistré avec succès.',
			user: newUser,
		});
	} else {
		res.status(405).json({
			message: 'Une erreur est survenue.',
		});
	}
}
