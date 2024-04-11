import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client/web";

import { env } from "~/env";

const createLibsqlClient = () => {
  const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  });

  return libsql;
};

const createPrismaClient = () => {
  const libsql = createLibsqlClient();
  globalForPrisma.libsql = libsql;

  const adapter = new PrismaLibSQL(libsql);

  return new PrismaClient({
    adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
  libsql: ReturnType<typeof createLibsqlClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();
export const libsql = globalForPrisma.libsql ?? createLibsqlClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
if (env.NODE_ENV !== "production") globalForPrisma.libsql = libsql;
