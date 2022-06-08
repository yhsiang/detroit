import type { IronSessionOptions } from "iron-session"

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "detroit",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}

declare module "iron-session" {
  interface IronSessionData {
    forkId?: string;
  }
}