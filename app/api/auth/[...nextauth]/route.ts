import NextAuth, { NextAuthOptions } from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";
import connect from "@/lib/mongodb";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureAD({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID as string,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      await connect();

      if (profile && profile.email && profile.name) {
        let user = await User.findOne({ email: profile.email });
        if (!user) {
          user = new User({
            name: profile.name,
            email: profile.email,
            image: profile.image,
          });
          await user.save();
        }

        token.id = user._id.toString();
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.picture as string | null;
      session.user.role = token.role as string;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
