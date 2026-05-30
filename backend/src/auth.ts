import "dotenv/config";
import passport from "passport";
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma singleton (prevents connection explosion in dev/hot-reload/serverless)
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient | undefined;

try {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is missing from the environment.");
  }

  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      adapter: new PrismaPg({ connectionString }),
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaInstance;
  }
} catch (e) {
  console.error("Prisma client failed to initialize:", e);
  console.error(
    "Ensure you have a valid DATABASE_URL in your .env and run `npx prisma generate`."
  );
  throw e;
}

export const prisma = prismaInstance;

/**
 * GitHub OAuth Strategy
 */
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK_URL || "/auth/github/callback",
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => {
      try {
        const provider = "github";
        const providerId = profile.id;

        // GitHub email is optional → fallback to safe synthetic identity
        const email =
          profile.emails?.[0]?.value ??
          `${providerId}@github.local`;

        /**
         * 1. Check if user already exists
         */
        let user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (user) {
          return done(null, user);
        }

        /**
         * 2. Create new user
         */
        user = await prisma.user.create({
          data: {
            name: profile.displayName || profile.username || "GitHub User",
            email,
          },
        });

        return done(null, user);
      } catch (err) {
        console.error("GitHub OAuth error:", err);
        return done(err as Error);
      }
    }
  )
);

/**
 * Session handling (required for Passport)
 */
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
