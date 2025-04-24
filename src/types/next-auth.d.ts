// declare module "next-auth" {
//   interface Session {
//     accessToken: string;
//     refreshToken: string;
//     user: {
//       email: string;
//       role: string;
//     };
//   }

//   interface User {
//     accessToken: string;
//     refreshToken: string;
//     email: string;
//     role: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken: string;
//     refreshToken: string;
//     user: {
//       email: string;
//       role: string;
//     };
//   }
// }

// import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     accessToken?: string;
//     refreshToken?: string;
//   }

//   interface User extends DefaultUser {
//     accessToken?: string;
//     refreshToken?: string;
//     role?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     accessToken?: string;
//     refreshToken?: string;
//     user?: {
//       email: string;
//       role: string;
//     };
//   }
// }

import { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    refreshToken?: string;
  }

  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
    role?: string | null;
    email?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    refreshToken?: string;
    user?: {
      email?: string | null;
      role?: string | null;
    };
  }
}
