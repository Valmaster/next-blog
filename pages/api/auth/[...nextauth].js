// Librairies
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import {connectToDatabase} from '../../../helpers/mongodb';
import {verifyPassword} from '../../../helpers/auth';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: "Username", type: "text", placeholder: "Username"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                const {email, password} = credentials;

                // Connexion à MongoDB
                const clientMongoDB = await connectToDatabase();

                // 1ère étape : l'user existe-t-il ?
                const user = await clientMongoDB
                    .db()
                    .collection('users')
                    .findOne({email: email});

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
    session: { jwt: true },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async jwt({ token, user, account }) {
            if (user || account) {
                let new_token = {};
                new_token.access_token = account.access_token;
                new_token.user = { id: user.id, email: user.email, username: user.username, roles: user.roles };
                return new_token;
            }

            return token;
        },
        async session({ session, token }) {
            session.access_token = token.access_token;
            session.user = token.user;
            return session;
        },
    },
    secret: 'secretkey',
    jwt: {
        secret: 'test',
        encryption: true
    },
});
