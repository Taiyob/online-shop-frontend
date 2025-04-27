/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User, Account } from "next-auth";
import { jwtDecode } from "jwt-decode";

interface CustomUser {
  email: string;
  role: string;
}

interface AuthResponse {
  data: {
    user: CustomUser;
    accessToken: string;
    refreshToken: string;
  };
}

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: `refreshToken=${token.refreshToken}`,
        },
      }
      // {
      //   headers: {
      //     Authorization: `${token.refreshToken}`,
      //   },
      // }
    );

    const newTokens = await res.json();
    console.log("New tokens: ", newTokens);

    if (!res.ok) {
    }

    return {
      ...token,
      accessToken: newTokens.data.accessToken,
      refereshTokn: newTokens.data.refreshToken ?? token.refereshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "Refresh access token error",
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const inputEmail = credentials.email as string;
        const password = credentials.password as string;

        try {
          const res = await fetch(
            `${process.env.SERVER_URL}/api/v1/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify({ email: inputEmail, password }),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!res.ok) {
            return null;
          }

          const parsedResponse: AuthResponse = await res.json();
          // console.log("From auth", parsedResponse);

          const { user, accessToken, refreshToken } = parsedResponse.data;
          // console.log("From auth", user);
          const { email, role } = user;

          return {
            //...user,
            email,
            role,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          console.log(error);
          throw new Error("Something went wrong...");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({
      token,
      account,
      user,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
    }): Promise<JWT> => {
      // console.log(`In JWT callback, token is: ${JSON.stringify(token)}`);

      if (token?.accessToken) {
        const decodeToken = jwtDecode<DecodedToken>(token.accessToken!);
        // console.log("Decode token: ", decodeToken);

        token.accessTokenExpires = decodeToken.exp * 1000;
      }

      if (account && user) {
        // console.log(`In JWT callback, user is: ${JSON.stringify(user)}`);
        // console.log(`In JWT callback, account is: ${JSON.stringify(account)}`);

        const email = user.email ?? "";
        const role = user.role ?? "";

        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user: {
            email,
            role,
          },
        };
      }
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      return refreshAccessToken(token);
    },
    session: async ({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> => {
      // console.log(`In SESSION callback, token is: ${JSON.stringify(token)}`);

      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }

      return session;
    },
  },
});
