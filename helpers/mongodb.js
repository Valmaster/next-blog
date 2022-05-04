// Librairie
import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	// Connexion à MongoDB
	const client = await MongoClient.connect(
		'mongodb+srv://Valmaster:FyrxcLtwkQcbPq7J@cluster0.hmbsg.mongodb.net/blog-tuto?retryWrites=true&w=majority',
	);

	return client;
}
