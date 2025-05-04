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
          "Content-Type": "application/json",
          Cookie: `refreshToken=${token.refreshToken}`,
        },
      }
    );

    // console.log("Request to refresh token:", res);
    // console.log("Response Status:", res.status);

    const responseText = await res.clone().text();
    console.log("Response Body:", responseText);

    if (!res.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await res.json();
    // console.log("New tokens: ", data);

    const decodeToken = jwtDecode<DecodedToken>(data.data.accessToken);
    return {
      ...token,
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken ?? token.refreshToken,
      accessTokenExpires: decodeToken.exp * 1000,
    };
  } catch (error) {
    console.error("Error refreshing token: ", error);
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
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/login-super-admin`,
            {
              method: "POST",
              body: JSON.stringify({ email: inputEmail, password }),
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );

          if (!res.ok) {
            return null;
          }

          const parsedResponse: AuthResponse = await res.json();

          const { user, accessToken, refreshToken } = parsedResponse.data;
          const { email, role } = user;

          return {
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
      if (token?.accessToken) {
        const decodeToken = jwtDecode<DecodedToken>(token.accessToken!);

        token.accessTokenExpires = decodeToken.exp * 1000;
      }

      if (account && user) {
        if (account.provider === "google" || account.provider === "github") {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/social-login`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: user.email,
                  name: user.name,
                  provider: account.provider,
                }),
              }
            );

            const result = await res.json();
            const { accessToken, refreshToken, user: socialUser } = result.data;

            return {
              ...token,
              accessToken,
              refreshToken,
              user: {
                email: socialUser.email,
                role: socialUser.role,
              },
            };
          } catch (error) {
            console.error("Social login to backend failed", error);
          }
        }

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
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user = token.user;
      }

      return session;
    },
  },
});
