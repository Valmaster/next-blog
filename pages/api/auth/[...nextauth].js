// Librairies
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../helpers/mongodb';
import { verifyPassword } from '../../../helpers/auth';

export default NextAuth({
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				const { email, password } = credentials;

				// Connexion à MongoDB
				const clientMongoDB = await connectToDatabase();

				// 1ère étape : l'user existe-t-il ?
				const user = await clientMongoDB
					.db()
					.collection('users')
					.findOne({ email: email });

				if (!user) {
					clientMongoDB.close();
					throw new Error(
						'Impossible de vous authentifier.',
					);
				}

				// 2ème étape : le mot de passe est-il correct avec celui enregistré ?
				const isValid = await verifyPassword(
					password,
					user.password,
				);

				if (!isValid) {
					clientMongoDB.close();
					throw new Error(
						'Impossible de vous authentifier.',
					);
				}

				// Succès
				clientMongoDB.close();
				return {
					email: user.email,
					name: user.username,
					id: user._id,
					roles: user.roles,
				};
			},
		}),
	],
	callbacks: {
		jwt: async (token, user) => {
			user && (token.user = user);
			return token;
		},
		session: async (session, user) => {
			session.user = user.user;
			return session;
		},
	},
});
