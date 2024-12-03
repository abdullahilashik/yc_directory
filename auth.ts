import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { client } from './sanity/lib/client';
import { AUTHOR_BY_GITHUB_ID } from './sanity/lib/queries';
import { writeClient } from './sanity/lib/write-client';
export const {signIn, signOut, auth, handlers} = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({user, account, profile}) {
            const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID, {id: profile?.id});
            if(!existingUser){
                // user does not exists
                await writeClient.create({
                    _type: 'author',
                    id: profile?.id,
                    name: user?.name,
                    username: profile?.login,
                    email: user?.email,
                    image: user?.image,
                    bio: profile?.bio || ''
                });
            }
            return true;
        },
        async jwt({token, account, profile}){
            if(account && profile){
                const user = await client.fetch(AUTHOR_BY_GITHUB_ID, {id: profile?.id});
                token.id = user?._id;
            }
            return token;
        },
        async session({session, token}){
            Object.assign(session, {id: token.id});
            session.user.id = token?.id as unknown as string;
            return session;
        }
    }
})